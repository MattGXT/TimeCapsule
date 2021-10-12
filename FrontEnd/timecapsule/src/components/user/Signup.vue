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
      <label class="label">用户名</label>
      <input class="input-lg" type="text" v-model="name" />
    </div>
    <div class="div-lg">
        <label class="label">你是？</label><br>
      <input type="radio" id="zero" v-model="gender" value=0 />
      <label for="zero">女</label>
      <input type="radio" id="one" v-model="gender" value=1 />
      <label for="one">男</label>
    </div>
    <div class="div-lg">
      <button type="button" @click="register">注册</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignupComponent",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      name:"",
      gender:null
    };
  },

  methods: {
    register() {
      if (this.email === "" || this.password === "") {
        alert("please!");
        return;
      }
      const user = { email: this.email, password: this.password };
      axios
        .post("http://localhost:3000/signup", user)
        .then((res) => {
          if (res.status === 200) {
            alert("please check your email")
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
