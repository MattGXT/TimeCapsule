<template>
  <div class="home">
    <RequestGet
      v-bind="$attrs"
      v-if="token !== null && mateId == null"
    ></RequestGet>
    <CapsuleList
      :lists="capsule"
      v-on:refresh="getCapsule()"
      :loading="loading"
      v-on:getNext="getNext"
    ></CapsuleList>
  </div>
</template>

<script>
import RequestGet from "../components/request/Request.vue";
import CapsuleList from "../components/capsule/List.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    CapsuleList,
    RequestGet,
  },
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
      mateId: computed(() => store.state.mateId),
      setMateId: (mateId) => store.commit("setMateId", mateId),
    };
  },
  data() {
    return {
      capsule: [],
      loading: false,
      page: 0,
      amount: 12,
      isFullLoaded:false
    };
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
      this.loading = true;
      return axios
        .get(
          "http://localhost:3000/get-capsule",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
            params: {
              page: this.page,
              amount: this.amount
            },
          }
        )
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
        .catch(() => {
          this.$emit("alert", "网络好像有点问题...");
        });
    },

    getNext() {
      if(this.isFullLoaded) return
      this.page += 1;
      this.getCapsule();
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
}

.footer {
  width: 100%;
}
</style>
