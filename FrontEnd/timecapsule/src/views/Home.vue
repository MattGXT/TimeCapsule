<template>
  <div class="home">
    <CapsuleList :lists = capsule></CapsuleList>
  </div>
</template>

<script>
import CapsuleList from "../components/capsule/List.vue"
import { useStore } from "vuex";
import { computed } from "vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    CapsuleList
  },
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
      mateId: computed(() => store.state.mateId),
      setMateId: (mateId) => store.commit("setMateId", mateId),
    };
  },
  data(){
    return{
      capsule: [],
    }
  },
  async created() {
    await this.tokenValid();  
    await this.getCapsule();
  },
  async activated() {
    await this.tokenValid();
    await this.getCapsule();
    
  },
  methods: {
    async tokenValid() {
      if (this.token !== null) {
        return axios
          .get("http://localhost:3000/check", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((res) => {
            if (res.status === 200 && res.data.mateId !== null) {
              localStorage.setItem("mateId", res.data.mateId);
              this.setMateId(res.data.mateId);
            }
          })
          .catch((error) => {
            console.log(error);
            localStorage.clear();
          });
      }
    },

    async getCapsule() {
      return axios
        .get("http://localhost:3000/get-capsule", {
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
.home {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.footer {
  width: 100%;
}
</style>
