<template>
  <div>
      <UserSignUp v-bind="$attrs"></UserSignUp>
      <EmailVerify v-bind="$attrs" v-show="showModal" v-on:closeModal = "this.showModal = false"></EmailVerify>
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
      showModal:true,
    };
  },
  created() {

  },
  methods: {
    register(){
        this.$router.push('/register')
    }
  },
};
</script>

<style scoped>
.container-register{
  
}
</style>
