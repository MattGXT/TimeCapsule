<template>
  <button @click="handleClick" :disabled="btnDisabled" :type="nativeType">
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "m-btn",
  components: {},
  props: {
    nativeType: {
      type: String,
      default: "button",
    },
    disabled: Boolean,
  },
  computed: {
    btnDisabled() {
      return this.disabled;
    },

    
  },
  methods: {
      handleClick(evt) {
        this.$emit("click", evt);
      },
    },
};
</script>

<style lang="scss" scoped>
.isolation {
  isolation: isolate;
}
button {
  display: block;
  cursor: pointer;
  background: #ffffff;
  border: none;
  margin: 0.5em 0;
  padding: 0.8em 2.2em;
  z-index: 10;

  mix-blend-mode: color-burn;
  font-size: 1.4em;
  font-family: STXihei;
  letter-spacing: 0.4em;

  border-radius: 0.4em;

  transform-style: preserve-3d;

  &:before,
  &:after {
    --z: 0px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0;
    mix-blend-mode: inherit;
    border-radius: inherit;
    transform-style: preserve-3d;
    transform: translate3d(
      calc(var(--z) * 0px),
      calc(var(--z) * 0px),
      calc(var(--z) * 0px)
    );
  }

  &:after {
    background-color: #ffbcbc;
  }

  &:before {
    background-color: #edf6e5;
  }

  &:hover {
    background-color: #ffffff;
    transition: background 0.3s 0.1s;
  }

  &:hover:before {
    --z: 0.05;
    animation: translateWobble 2.2s ease forwards;
  }

  &:hover:after {
    --z: -0.06;
    animation: translateWobble 2.2s ease forwards;
  }

  &:disabled {
    pointer-events: none;
  }
}

@keyframes translateWobble {
  0% {
    opacity: 0;
    transform: translate3d(
      calc(var(--z) * 0px),
      calc(var(--z) * 0px),
      calc(var(--z) * 0px)
    );
  }
  16% {
    transform: translate3d(
      calc(var(--z) * 160px),
      calc(var(--z) * 160px),
      calc(var(--z) * 160px)
    );
  }
  28% {
    opacity: 1;
    transform: translate3d(
      calc(var(--z) * 70px),
      calc(var(--z) * 70px),
      calc(var(--z) * 70px)
    );
  }
  44% {
    transform: translate3d(
      calc(var(--z) * 130px),
      calc(var(--z) * 130px),
      calc(var(--z) * 130px)
    );
  }
  59% {
    transform: translate3d(
      calc(var(--z) * 85px),
      calc(var(--z) * 85px),
      calc(var(--z) * 85px)
    );
  }
  73% {
    transform: translate3d(
      calc(var(--z) * 110px),
      calc(var(--z) * 110px),
      calc(var(--z) * 110px)
    );
  }
  88% {
    opacity: 1;
    transform: translate3d(
      calc(var(--z) * 90px),
      calc(var(--z) * 90px),
      calc(var(--z) * 90px)
    );
  }
  100% {
    opacity: 1;
    transform: translate3d(
      calc(var(--z) * 100px),
      calc(var(--z) * 100px),
      calc(var(--z) * 100px)
    );
  }
}
</style>
