<template>
  <div class="home">
    <UserLogin v-show="token == null"></UserLogin>
    <CapsuleCreate v-show="token !== null"></CapsuleCreate>
    <button type = "button" v-show="token !== null" @click = "logout">登出</button>
  </div>
</template>

<script>
// @ is an alias to /src
import UserLogin from "../components/user/Login.vue";
import CapsuleCreate from "../components/capsule/Create.vue";
import { useStore } from "vuex"
import { computed } from 'vue'
import axios from "axios"

export default {
  name: "Home",
  components: {
    UserLogin,
    CapsuleCreate,
  },
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
      logout: () => {
        store.commit('logout')
        localStorage.clear()
        }
    };
  },
  created(){
    if(this.token!==null){
      axios
          .get("http://localhost:3000/check",{
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("Token available")
            }
          })
          .catch((error) => {
            console.log(error)
            localStorage.clear()
          });
    }
  },
  method:{

  }
};
</script>
