<template>
  <div class="container-input">
    <input
      class="input-field"
      :type="nativeType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      placeholder=" "
      :class="{ simple: simple }"
    />
    <span class="input-label" :class="{ 'simple-label': simple,'input-label':!simple }">{{ hint }}</span>
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
    error: Boolean,
    hint: {
      type: String,
      default: "",
    },
    simple: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  computed: {},
  created() {},
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
  border: 3px solid #ffcef3;
  font-size: 1rem;

  padding: calc(var(--size-bezel) * 1.5) var(--size-bezel);
  color: currentColor;
  background: #fdfdfd;
  outline: none;
  border-radius: 4px;

  &:focus,
  &:not(:placeholder-shown) {
    & + .input-label {
      transform: translate(0.25rem, -65%) scale(0.8);
      color: #cabbe9;
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
  color: #ffcef3;
  transition: transform 120ms ease-in;
  font-weight: bold;
  line-height: 1.2;
  user-select: none;
  z-index: 1;
}

.simple {
  border: none;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 0;

  font-family: inherit;
  width: 100%;
  outline: 0;
  font-size: 1rem;
  padding: 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:focus,
  &:not(:placeholder-shown) {
    & + .input-label {
      transform: translate(0, -80%) scale(0.8);
      color: rgba(0, 0, 0, 0.2);
    }
  }

  &:focus {
    ~ .simple-label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #a1eafb;
      font-weight: 700;
    }
    border-image: linear-gradient(to right, #a1eafb, #ffcef3);
    border-image-slice: 1;
  }
}

.simple-label{
  margin:0;
  padding:0;
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.2);
}
</style>
