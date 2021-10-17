<template>
<input type="nativeType">
</template>

<script>
export default {
  name: "m-input",
  components: {},
  props: {
    nativeType: {
      type: String,
      default: "text",
    },
    label:String
  },
  computed: {
  },
  methods: {
    },
};
</script>

<style lang="scss" scoped>
input{
  border: none;
  border-radius: 5px;
  flex: auto;
  width: 80%;
  height: 2em;
  font-size: 2em;
  outline-color: #F38BA0;
  padding: 0;
}
</style>
