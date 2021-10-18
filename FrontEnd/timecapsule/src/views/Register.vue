<template>
  <div class="">
      <UserSignUp></UserSignUp>
  </div>
</template>

<script>
// @ is an alias to /src
import UserSignUp from "../components/user/Signup.vue";

export default {
  name: "Register",
  components: {
      UserSignUp
  },
  data() {
    return {
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

</style>
