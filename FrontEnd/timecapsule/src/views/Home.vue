<template>
  <div class="home">
    <RequestGet
      v-bind="$attrs"
      v-if="token !== null && mateId == ''"
    ></RequestGet>
    <CapsuleList
      :lists="capsule"
      v-on:refresh="getCapsule()"
      :loading="loading"
      v-on:getNext="getNext"
      v-if="token !== null && mateId !== ''"
    ></CapsuleList>
    <m-modal v-bind="$attrs" v-show="showModal" v-on:closeModal = "this.showModal = false" :contents = modalContent></m-modal>
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
      isFullLoaded: false,
      showModal:false,
      modalContent:null,
      ws:undefined
    };
  },
  async created() {
    await this.tokenValid();
  },
  async activated() {
    await this.tokenValid();
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
            if (res.status === 200) {
              localStorage.setItem("mateId", res.data.mateId);
              this.setMateId(res.data.mateId);
              this.getCapsule();
              this.wsConnect()
            }
          })
          .catch(() => {
            this.$emit('logout')
          });
      }
    },

    async getCapsule() {
      this.loading = true;
      return axios
        .get("http://localhost:3000/get-capsule", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          params: {
            page: this.page,
            amount: this.amount,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length === 0) {
              this.isFullLoaded = true;
            }
            if (this.capsule.length > 0) {
              this.capsule = this.capsule.concat(res.data);
              this.loading = false;
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
      if (this.isFullLoaded) return;
      this.page += 1;
      this.getCapsule();
    },

    wsConnect() {
      if(this.ws) return
      const ws = new WebSocket("ws://localhost:3000?token=" + this.token);
      this.ws = ws
      console.log("connection start");
      ws.onopen = function() {
        let ping = setInterval(() => {
          if(ws.readyState === 1){ws.send("ping");}
          else{
            clearInterval(ping)
          }
        }, 15000);
        
      };
      ws.onmessage = mes => {
          this.modalContent = JSON.parse(mes.data)
          this.showModal = true
        };
      ws.onclose = ()=> {
        setTimeout(()=> {
          if(this.token !== null){this.wsConnect();}
        }, 10000);
      };
      ws.onerror = ()=> {
        ws.close();
      };
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
