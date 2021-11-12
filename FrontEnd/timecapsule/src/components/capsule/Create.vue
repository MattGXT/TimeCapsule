<template>
  <div class="container-capsule">
    <div>
      <m-textarea placeholder="今天想说些什么呢？" v-model="content"></m-textarea>
      <label>要埋多久呢？</label><br />
      <input type="radio" id="one" v-model="availableAt" value=0 />
      <label for="one">半年</label><br>
      <input type="radio" id="one" v-model="availableAt" value=1 />
      <label for="one">一年</label><br>
      <input type="radio" id="three" v-model="availableAt" value=3 />
      <label for="three">三年</label><br>
      <input type="radio" id="five" v-model="availableAt" value=5 />
      <label for="five">五年</label><br>
      <input type="radio" id="five" v-model="availableAt" value=10 />
      <label for="five">十年</label>
    </div>
    <div class="footer">
      <button type="button" @click = "create">埋下</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token)
    };
  },
  name: "CapsuleCreate",
  components: {},
  data() {
    return {
      availableAt:null,
      content:""
    };
  },

  methods: {
    create(){
      if (this.availableAt == null || this.content === ""){
        this.$emit("alert","请注意！")
        return
      }
      const data = {"availableAt":parseInt(this.availableAt),"content": this.content}
      axios
        .post("http://localhost:3000/create-capsule",data,{
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Successful")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style>
.container-capsule {
  width: 60vw;
  border: 2px solid #A1EAFB;
  border-radius: 8px;
  box-shadow: 5px 10px 10px rgba(greenSeaweed, 0.2);
  background-color: #FDFDFD;
  padding: 1em;
  box-shadow: 0 3px 1px -2px rgb(161 234 251 / 20%), 0 2px 2px 0 rgb(161 234 251 / 14%), 0 1px 5px 0 rgb(161 234 251 / 12%);
  text-align:left;
  margin: 20px auto 0 auto;
}

label {
  display: inline-block;
}



.footer{
  text-align: center;
}
</style>
