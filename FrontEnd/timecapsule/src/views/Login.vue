<template>
  <div class="login">
    <UserLogin v-bind="$attrs" v-on:verify="verify"></UserLogin>
    <EmailVerify v-bind="$attrs" v-show="showModal" v-on:closeModal = "this.showModal = false" :email = "email"></EmailVerify>
  </div>
</template>

<script>
// @ is an alias to /src
import UserLogin from "../components/user/Login.vue";
import EmailVerify from "../components/user/Email.vue";

export default {
  name: "Login",
  components: {
      UserLogin,EmailVerify
  },
  data(){
    return{
      showModal:false,
      email:""
    }
  },
  created() {

  },
  methods: {
    verify(email){
      this.showModal = true
      this.email = email
    }
  },
};
</script>

<style>
.login {

  margin: 0 auto;
}

</style>
