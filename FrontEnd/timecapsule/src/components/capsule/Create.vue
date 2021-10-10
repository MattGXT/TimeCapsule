<template>
  <div class="capsule-container">
    <div>
      <label>What do you want to say?</label><br>
      <textarea v-model="content" placeholder="What do you want to say now?"></textarea>
      <label>When you want her/him to know?</label><br />
      <input type="radio" id="one" v-model="availableAt" value=0 />
      <label for="one">半年</label>
      <input type="radio" id="one" v-model="availableAt" value=1 />
      <label for="one">一年</label>
      <input type="radio" id="three" v-model="availableAt" value=3 />
      <label for="three">三年</label>
      <input type="radio" id="five" v-model="availableAt" value=5 />
      <label for="five">五年</label>
      <input type="radio" id="five" v-model="availableAt" value=10 />
      <label for="five">十年</label>
    </div>
    <div>
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
      if (this.availableAt == null && this.content === ""){
        alert("Please!")
        return
      }
      const data = {"availableAt":this.availableAt,"content": this.content}
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
.capsule-container {
  width: 20vw;
  border: 2px solid #fcd1d1;
  border-radius: 10px;
  box-shadow: 5px 10px 10px rgba($greenSeaweed, 0.2);
  background-color: #bce6eb;
  @include transform(translate(-50%, -50%));
  @include transition(transform 300ms, box-shadow 300ms);
  padding: 1em;
  text-align:left;
}

label {
  display: inline-block;
}

textarea {
  resize: none;
  width: 90%;
  outline: none;
}
</style>
