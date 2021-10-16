<template type="text/x-template" id="modal-template">
  <div class="modal-mask">
    <div class="modal-wrapper" @click="$emit('close')">
      <div class="modal-container" @click.stop>

        <div class="modal-body">
          <div>
            <label class="label">Email</label>
            <input class="input-lg" v-model="email" />
          </div>
          <div>
            <label class="label">密码</label>
            <input class="input-lg" type="password" v-model="password" />
          </div>
          <div>
            <label class="label">用户名</label>
            <input class="input-lg" type="text" v-model="name" />
          </div>
          <div>
            <label class="label">你是？</label><br />
            <input type="radio" id="zero" v-model="gender" value="0" />
            <label for="zero">女</label><br>
            <input type="radio" id="one" v-model="gender" value="1" />
            <label for="one">男</label>
          </div>
          <div>
            <button type="button" @click="register">注册</button>
          </div>
        </div>
      </div>
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
    };
  },

  methods: {
    register() {
      if (this.email === "" || this.password === "") {
        alert("please!");
        return;
      }
      const user = { email: this.email, password: this.password };
      axios
        .post("http://localhost:3000/signup", user)
        .then((res) => {
          if (res.status === 200) {
            alert("please check your email");
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

.label {
  text-align: left;
  padding: 1px 2px;
}

.modal-body > div:nth-child(-n+4) {
  padding-top: 1em;
  text-align: left;
}

.modal-body > div:nth-child(-n+3) > input{
  border: none;
  border-radius: 5px;
  flex: auto;
  width: 100%;
  height: 20px;
  outline-color: #F38BA0;
  padding: 0;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  background-color: #bce6eb;
  width: 300px;
  margin: 0px auto;
  border: 2px solid #fcd1d1;
  padding: 20px 30px;
  border-radius: 2px;
  transition: all .3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}


</style>
