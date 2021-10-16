<template>
  <div class="container-mate">
    <label>告诉我他/她的email</label>
    <input v-model="email" />
    <button type="button" @click="requestCreate">Send</button>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
      setToken: (token) => store.commit("setToken", token),
    };
  },
  name: "MateComponent",
  components: {},
  data() {
    return {
      email: "",
    };
  },

  methods: {
    requestCreate() {
      if (this.email === "") {
        alert("please!");
        return;
      }
      const user = { targetEmail: this.email };
      axios
        .post("http://localhost:3000/create-request", user, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Successful");
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.container-mate {
  width: 100%;
  border: 2px solid #fcd1d1;
  border-radius: 10px;
  box-shadow: 5px 10px 10px rgba(greenSeaweed, 0.2);
  background-color: #bce6eb;
  @include transform(translate(-50%, -50%));
  @include transition(transform 300ms, box-shadow 300ms);
  padding: 1em;

}
</style>
