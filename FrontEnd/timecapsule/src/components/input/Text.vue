<template>
  <div class="container-input">
    <input
    class="input-field"
      :type="nativeType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      placeholder=" "
    />
    <span class="input-label">{{ hint }}</span>
  </div>
</template>

<script>
export default {
  name: "m-input",
  inheritAttrs: false,
  components: {},
  props: {
    nativeType: {
      type: String,
      default: "text",
    },
    label: String,
    modelValue: String,
    error:Boolean,
    hint: {
      type: String,
      default: "",
    },
  },
  emits: ['update:modelValue'],
  computed: {},
  created() {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container-input {
  position: relative;
  --size-bezel: 0.5rem;
}

.input-field {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 3px solid #FFCEF3;
  font-size: 1rem;

  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
  color: currentColor;
  background: #FDFDFD;
  outline: none;
  border-radius: 4px;


  &:focus,
  &:not(:placeholder-shown) {
    & + .input-label {
      transform: translate(0.25rem, -65%) scale(0.8);
      color: #CABBE9;
      background: transparent;
    }
  }

}

.input-label {
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  padding: calc(var(--size-bezel) * 0.75) calc(var(--size-bezel) * 0.5);
  margin: calc(var(--size-bezel) * 0.75 + 3px) calc(var(--size-bezel) * 0.5);
  white-space: nowrap;
  transform: translate(0, 0);
  transform-origin: 0 0;
  background: transparent;
  color: #FFCEF3;
  transition: transform 120ms ease-in;
  font-weight: bold;
  line-height: 1.2;
  user-select: none;
  z-index: 1;
}
</style>
