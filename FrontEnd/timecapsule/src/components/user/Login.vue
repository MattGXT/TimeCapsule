<template>
  <div class="container-lg">
    <div class="input-lg">
      <m-input type="email" v-model="email" :hint="'Email'" @keyup.enter="login"/>
    </div>
    <div class="input-lg">
      <m-input type="password" v-model="password" :hint="'密码'" @keyup.enter="login"/>
    </div>

    <div class="isolation">
      <m-btn @click="register">注册</m-btn>
      <m-btn type="submit" @click="login">登录</m-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
      setToken: (token) => store.commit("setToken", token),
      setMateId: (mateId) => store.commit("setMateId", mateId),
    };
  },
  name: "LoginComponent",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      if (this.email === "" || this.password === "") {
        this.$emit("alert","请输入正确的格式")
        return;
      }
      const user = { email: this.email.toLowerCase() , password: this.password };
      axios
        .post("http://localhost:3000/login", user)
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.accessToken;
            localStorage.setItem("token", token);
            this.setToken(token);
            const mateId = res.data.mateId;
            this.setMateId(mateId);
            const name = res.data.name;
            localStorage.setItem("name",name);
            const email = res.data.email;
            localStorage.setItem("email",email);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          if(!error?.response?.status){
            this.$emit("alert","稍等一下，网络可能有些问题")
            return
          }
          switch (error.response.status){
            case 400:
              this.$emit("alert","用户名/密码错误")
              break
            case 401:
              this.$emit("alert","请验证您的邮箱")
              break
            default:
              this.$emit("alert","未知错误")
          }
        });
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
.container-lg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
  margin: 0 auto;
  
  
}

.input-lg {
  width: 20rem;
}

.container-lg > div {
  padding-top: 1em;
  text-align: left;
}

.container-lg > div:nth-child(3) {
  text-align: center;
}

.isolation {
  isolation: isolate;
  transform: rotateX(10deg);
}
</style>
