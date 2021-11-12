<template>
  <div class="login">
    <UserLogin v-bind="$attrs"></UserLogin>
  </div>
</template>

<script>
// @ is an alias to /src
import UserLogin from "../components/user/Login.vue";

export default {
  name: "Login",
  components: {
      UserLogin
  },
  
  created() {

  },
  methods: {
    
  },
};
</script>

<style>
.login {

  margin: 0 auto;
}

</style>
