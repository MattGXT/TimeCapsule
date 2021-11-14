<template>
  <div class="sendbox_capsule">
    <CapsuleList :lists = capsule :isSendbox="true" title="正在路上"></CapsuleList>
  </div>
</template>

<script>
import CapsuleList from "../components/capsule/List.vue"
import { useStore } from "vuex";
import { computed } from "vue";
import axios from "axios";

export default {
  name: "Sendbox",
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
    };
  },
  data(){
    return{
      capsule: [],
    }
  },
  components: {
    CapsuleList
  },
  async created() { 
    await this.getCapsuleSend();
  },
  async activated() {
    await this.getCapsuleSend();
    
  },

  methods: {
    async getCapsuleSend() {
      return axios
        .get("http://localhost:3000/get-capsule-own", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.capsule = res.data
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.sendbox_capsule{
  display: flex;
}
</style>
