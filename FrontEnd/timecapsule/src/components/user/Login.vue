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
    <div>
      <button type="submit" @click="login">登录</button>
      <button type="submit" @click="signUp = true">注册</button>
      <transition name="modal">
      <UserSignUp v-show="signUp" @close = "signUp = false"></UserSignUp>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";
import UserSignUp from "./Signup.vue";

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
  components: {UserSignUp},
  data() {
    return {
      email: "",
      password: "",
      signUp : false
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
  },
};
</script>

<style>
.container-lg {
  display: flex;
  flex-direction: column;
  border: 2px solid #F38BA0;
  border-radius: 10px;
  box-shadow: 5px 10px 10px rgba(greenSeaweed, 0.2);
  background-color: #FFBCBC;
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
</style>
