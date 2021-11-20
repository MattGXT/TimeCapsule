<template>
  <div>
      <UserSignUp v-bind="$attrs" v-on:verify="verify"></UserSignUp>
      <EmailVerify v-bind="$attrs" v-show="showModal" v-on:closeModal = "this.showModal = false" :email = "email"></EmailVerify>
  </div>
</template>

<script>
// @ is an alias to /src
import UserSignUp from "../components/user/Signup.vue";
import EmailVerify from "../components/user/Email.vue";

export default {
  name: "Register",
  components: {
      UserSignUp,
      EmailVerify
  },
  data() {
    return {
      showModal:false,
      email:""
    };
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

<style scoped>
.container-register{
  
}
</style>
