<template>
  <div class="capsule-container">
    <div>
      <label>What do you want to say to:</label>
      <div contenteditable="true" class="content"></div>
    </div>
    <div>
      <label>When you want her/him to know?</label><br />
      <input type="radio" id="one" name="year" value="1" />
      <label for="one">一年</label>
      <input type="radio" id="three" name="year" value="3" />
      <label for="three">三年</label>
      <input type="radio" id="five" name="year" value="5" />
      <label for="five">五年</label>
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
      email: "",
      password: "",
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
}

.content {
  background-color: white;
  outline: none;
  width: 100%;
  height: 100%;
}

label {
  display: inline-block;
}
</style>
