<template>
  <div class="login">
    <UserLogin></UserLogin>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  transform: rotateX(10deg);
}

</style>
