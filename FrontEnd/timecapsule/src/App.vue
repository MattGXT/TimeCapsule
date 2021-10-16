<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:#B5EAEA;
  height: 100vh;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body{
  margin: 0;
  padding: 0 10%;
  min-width: 400px;
  width: auto !important;
  width:1000px;
}

button{
  border-radius: 10px;
  width: 100px;
  padding: 10px;
  background-color: #EDF6E5;
  border:2px solid #FFBCBC;
  cursor: pointer;
}

button:hover{
  border:2px solid #F38BA0;
}
</style>
