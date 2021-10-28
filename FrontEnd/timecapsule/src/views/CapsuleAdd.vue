<template>
  <div class="add-capsule">
    <CapsuleCreate v-show="token !== null && mateId !== null"></CapsuleCreate>
    <RequestCreate v-show="token !== null && mateId == null"></RequestCreate>
    <RequestGet v-if="token !== null && mateId == null"></RequestGet>
  </div>
</template>

<script>
import CapsuleCreate from "../components/capsule/Create.vue";
import RequestCreate from "../components/user/Mate.vue";
import RequestGet from "../components/request/Request.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import axios from "axios";

export default {
  name: "AddCapsule",
  components: {
    CapsuleCreate,
    RequestCreate,
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
  created() {
    this.tokenValid();  
  },
  activated() {
    this.tokenValid();  
  },
  methods: {
    tokenValid() {
      if (this.token !== null) {
        axios
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
    }
  },
};
</script>

<style scoped>
</style>
