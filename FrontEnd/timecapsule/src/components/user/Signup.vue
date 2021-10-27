<template>
  <div class="container-signUp" @click.stop>
    <div class="input-signUp">
      <m-input v-model="email" :hint="'Email'" />
    </div>
    <div class="input-signUp">
      <m-input type="password" v-model="password" :hint="'密码'" />
    </div>
    <div class="input-signUp">
      <m-input type="text" v-model="name" :hint="'用户名'" @keyup.enter="register"/>
    </div>

    <div class="input-signUp">
      <label for="female">
        <input class = "gender" type="radio" id="female" v-model="gender" value="0" checked/>
        <svg
          class="female"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z"
          ></path>
        </svg>
      </label>
      <label for="male">
        <input class = "gender" type="radio" id="male" v-model="gender" value="1" />
      <svg class="male" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z"
        ></path>
      </svg>
      </label>
      
    </div>
    <div class="isolation">
      <m-btn type="button" @click="register">注册</m-btn>
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
      name: "",
      gender: null,
      publicPath: process.env.BASE_URL,
    };
  },

  methods: {
    register() {
      if (this.email === "" || this.password === "" || this.gender === null) {
        alert("please!");
        return;
      }
      const user = { email: this.email, password: this.password };
      axios
        .post("http://localhost:3000/signup", user)
        .then((res) => {
          if (res.status === 200) {
            alert("please check your email");
            console.log(res)
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
.container-signUp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.isolation {
  isolation: isolate;
  text-align: center;
  transform: rotateX(10deg);
}

.input-signUp {
  width: 20rem;
  padding-top: 1em;
}

.male,.female{
  width: 3rem;
  fill: #EEEEEE;
}

.gender {
	position: absolute;
	opacity: 0;
}

.gender + svg {
	-webkit-transition: all 0.2s;
	transition: all 0.2s;
  cursor: pointer;
}


input[class="gender"][id="male"]:hover + svg[class="male"],
input[class="gender"][id="male"]:checked + svg[class="male"],
input[class="gender"][id="male"]:focus + svg[class="male"] {
	fill: #a1eafb;
}

input[class="gender"][id="female"]:hover + svg[class="female"],
input[class="gender"][id="female"]:checked + svg[class="female"],
input[class="gender"][id="female"]:focus + svg[class="female"] {
	fill: #FFCEF3;
}
</style>
