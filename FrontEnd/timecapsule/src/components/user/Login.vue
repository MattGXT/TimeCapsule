<template>
  <div class="container-lg">
    <div>
      <label class="label">Email</label>
      <input type="email" v-model="email" />
    </div>
    <div>
      <label class="label">密码</label>
      <input type="password" v-model="password" />
    </div>
    <div class = "isolation">
      <m-btn type="submit" @click="login">登录</m-btn>

      <m-btn @click="register">注册</m-btn>
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register(){
        this.$router.push('/register')
    }
  },
};
</script>

<style>
.container-lg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 5px 10px 10px rgba(greenSeaweed, 0.2);
  padding: 1em;
}

.label {
  text-align: left;
  padding: 1px 2px;
}

.container-lg > div {
  padding-top: 1em;
  text-align: left;
}

.container-lg > div > input{
  border: none;
  border-radius: 5px;
  flex: auto;
  width: 100%;
  height: 20px;
  outline-color: #F38BA0;
  padding: 0;
}

.container-lg>div:nth-child(3){
  text-align: center;
}

.isolation{
  isolation: isolate;
  text-align: center;
}
</style>
