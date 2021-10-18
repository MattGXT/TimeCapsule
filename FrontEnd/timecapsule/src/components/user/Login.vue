<template>
  <div class="container-lg">
    <div class="input-lg">
      <m-input type="email" v-model="email" :hint="'Email'" />
    </div>
    <div class="input-lg">
      <m-input type="password" v-model="password" :hint="'密码'" />
    </div>
    <div class="perspective">
      <div class="isolation">
        <m-btn @click="register">注册</m-btn>
        <m-btn type="submit" @click="login">登录</m-btn>
      </div>
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
      password: ""
    };
  },

  methods: {
    login() {
      if (this.email === "" || this.password === "") {
        alert("please!");
        return;
      }
      const user = { email: this.email, password: this.password };
      axios
        .post("http://localhost:3000/login", user)
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.accessToken;
            localStorage.setItem("token", token);
            this.setToken(token);
            const mateId = res.data.mateId;
            this.setMateId(mateId);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
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
  padding: 1em;
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
  text-align: center;
  transform: rotateX(10deg);
}

.perspective {
  perspective: 500px;
}
</style>
