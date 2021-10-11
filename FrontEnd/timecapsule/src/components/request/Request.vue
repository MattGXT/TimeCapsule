<template>
  <div class="container-requests">
    <h4>Invites</h4>
    <ul>
        <li v-for="content in contents" :key = "content._id">{{content.name}}-{{content.email}}<button type="button" @click ="requestApprove(content._id)">Approve</button></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      token: store.state.token,
      setToken: (token) => store.commit("setToken", token),
    };
  },
  name: "RequestComponent",
  components: {},
  data() {
    return {
      contents: undefined,
    };
  },
  created(){
      this.requestGet()
  },

  methods: {
    requestGet() {
      axios
        .get("http://localhost:3000/get-request", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Successful");
          }
          console.log(res);
          this.contents = res.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    requestApprove(id){
        const request = {"_id":{"$oid":id}}
        axios
        .post("http://localhost:3000/approve-request",request, {
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
    }
  },
};
</script>

<style>
.container-requests {
  width: 20vw;
  border: 2px solid #fcd1d1;
  border-radius: 10px;
  box-shadow: 5px 10px 10px rgba(greenSeaweed, 0.2);
  background-color: #bce6eb;
  @include transform(translate(-50%, -50%));
  @include transition(transform 300ms, box-shadow 300ms);
  padding: 1em;
}
</style>
