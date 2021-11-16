<template>
  <div class="sendbox_capsule">
    <CapsuleList :lists = capsule :isSendbox="true" title="正在路上" :loading="loading" v-on:getNext="getNext"></CapsuleList>
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
      loading: false,
      page: 0,
      amount: 12,
      isFullLoaded:false
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
    getCapsuleSend() {
      this.loading = true
      return axios
        .get("http://localhost:3000/get-capsule-own", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
           params: {
              page: this.page,
              amount: this.amount
            },
        })
        .then((res) => {
          if (res.status === 200) {
            if(res.data.length===0){
              this.isFullLoaded = true
            }
            if (this.capsule.length > 0) {
                  setTimeout(() => {
                    this.capsule = this.capsule.concat(res.data);
                  this.loading = false;
                  }, 1000);
            } else {
              this.capsule = res.data;
              this.loading = false;
            }
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getNext(){
      if(this.isFullLoaded) return
      this.page+=1
      this.getCapsuleSend()
    }
  },
};
</script>

<style scoped>
.sendbox_capsule{
  display: flex;
}
</style>
