<template>
  <div class="container-lg">
    <div class="div-lg">
      <label class="label">Email</label>
      <input class="input-lg" v-model="email" />
    </div>
    <div class="div-lg">
      <label class="label">密码</label>
      <input class="input-lg" type="password" v-model="password" />
    </div>
    <div class="div-lg">
      <button type="button" @click="login">登录</button>
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
  width: 10vw;
  border: 2px solid #fcd1d1;
  border-radius: 10px;
  box-shadow: 5px 10px 10px rgba(greenSeaweed, 0.2);
  background-color: #bce6eb;
  @include transform(translate(-50%, -50%));
  @include transition(transform 300ms, box-shadow 300ms);
  padding: 1em;
}

.input-lg {
  border: none;
  border-radius: 5px;
  flex: auto;
  width: 100%;
  min-width: 0;
  outline: none !important;
}

.label {
  text-align: left;
  padding: 1px 2px;
}

.div-lg {
  padding-top: 1em;
  text-align: left;
}
</style>
