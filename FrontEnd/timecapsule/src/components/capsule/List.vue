<template>
  <div class="contatiner-message">
    <h1>Capsules</h1>
    <ul :key = "list" v-for="list in lists">
      <li>{{ list.content }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CapsuleCreate",
  components: {},
  props: {lists:Array},
  data() {
    return {};
  },
  watch: {
  },
  created() {
  },
  activated() {},

  methods: {},
};
</script>

<style>
.contatiner-message{
  border: 2px solid #A1EAFB;
  border-radius: 8px;
  box-shadow: 5px 10px 10px rgba(greenSeaweed, 0.2);
  background-color: #FDFDFD;
  padding: 1em;
  box-shadow: 0 3px 1px -2px rgb(161 234 251 / 20%), 0 2px 2px 0 rgb(161 234 251 / 14%), 0 1px 5px 0 rgb(161 234 251 / 12%);
  text-align:left;
}
</style>
