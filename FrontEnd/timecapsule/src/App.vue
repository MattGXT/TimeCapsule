<template>
  <h1>{{ Hello }}</h1>
  <LoginComponent></LoginComponent>
</template>

<script>
import LoginComponent from './components/Login.vue'
export default {
  name: "App",
  components: {
    LoginComponent
  },
  data() {
    return {
      Hello: "Welcome to Timecapsule",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
