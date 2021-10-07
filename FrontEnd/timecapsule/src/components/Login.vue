<template>
    <div class = "login">
      <form>
        <div class="div-lg">
          <div class = "label">Email</div>
        <input v-model = "email">
        </div>
        <div class="div-lg">
          <div class = "label">密码</div>
        <input v-model = "password">
        </div>
        <div class = "div-lg">
          <button type="button" @click="login">登录</button>
        </div>
        
      </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  components: {},
  data() {
    return {
      email:"",
      password:""
    };
  },

  methods:{
    login(){
      if(this.email === ""||this.password === ""){
        alert("please!")
      }else{
        const user = {email:this.email,password:this.password}
        console.log(user)
        axios.post("http://localhost:3000/login", user).then((res)=>{
          if(res.status === 200){
            const token = res.data.accessToken
            console.log(token)
          }
        }).catch(error=>{
          console.log(error);
        })
      }
      
    }
  }
};
</script>

<style>
.login{
  width:10vw;
  border-style: solid;
  padding:1em 2em;
}

input{
  border: none;
  border-bottom: 1px solid;
  flex: auto;
  width:100%;
  min-width:0;
}

.label{
  text-align:left;
  padding:1px 2px;
}

.div-lg{
  padding-top:1em;
}
</style>
