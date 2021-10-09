<template>
  <div class="capsule-container">
    <div>
      <label>What do you want to say to:</label><br>
      <textarea v-model="content" placeholder="What do you want to say now?"></textarea>
      <label>When you want her/him to know?</label><br />
      <input type="radio" id="one" v-model="time" value="0" />
      <label for="one">半年</label>
      <input type="radio" id="one" v-model="time" value="1" />
      <label for="one">一年</label>
      <input type="radio" id="three" v-model="time" value="3" />
      <label for="three">三年</label>
      <input type="radio" id="five" v-model="time" value="5" />
      <label for="five">五年</label>
      <input type="radio" id="five" v-model="time" value="10" />
      <label for="five">十年</label>
    </div>
    <div>
      <button type="button">埋下</button>
    </div>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: "CapsuleCreate",
  components: {},
  data() {
    return {
      time:"",
      content:""
    };
  },

  methods: {},
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
