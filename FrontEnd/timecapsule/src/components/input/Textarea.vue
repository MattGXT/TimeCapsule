<template>
<div class="container-textarea">
<textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  ></textarea>
</div>
  
</template>

<script>
export default {
  name: "m-textarea",
  inheritAttrs:false,
  components: {},
  props: {
      modelValue: String,
  },
  emits: ["update:modelValue"],
  computed: {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.container-textarea{
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    background: #FFF;
    border-radius: 3px;
    padding: 0 12px;
    height: 100px;
        
}
textarea {
  margin-right: -12px;
  align-self: stretch;
  resize: none;
  width: 100%;
  outline: none;
  padding: 0;
  padding-right: 12px;
  margin: 10px 0 0 0;
  border: none;
  height: 80px;
}
</style>
