<template>
  <button :disabled="btnDisabled" :type="nativeType" :class="{'btn-normal':!thin,'btn-thin':thin,'bnw':bnw}">
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
    thin:{
      type: Boolean,
      default: false,
    },
    bnw:{
      type: Boolean,
      default: false,
    }
  },
  computed: {
    btnDisabled() {
      return this.disabled;
    },

    
  },
  methods: {
      
    },
};
</script>

<style lang="scss" scoped>
.isolation {
  isolation: isolate;
}
.btn-normal {
  display: block;
  cursor: pointer;
  background: #FDFDFD;
  border: 2px solid #A1EAFB;
  margin: 0.8em 0;
  padding: 0.6em 2.4em;
  z-index: 10;
  color: #A1EAFB;
  mix-blend-mode: color-burn;
  font-size: 1.1em;
  font-family: STXihei;
  font-weight: bold;
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
    background-color: #A1EAFB;
  }

  &:before {
    background-color: #FFCEF3;
  }

  &:hover {
    background-color: #ffffff;
    color: #A1EAFB;
    border-color: transparent;
    transition: background 0.3s 0.1s;
  }

  &:hover:before {
    --z: 0.07;
    animation: translateWobble 2.2s ease forwards;
  }

  &:hover:after {
    --z: -0.07;
    animation: translateWobble 2.2s ease forwards;
  }

  &:disabled {
    pointer-events: none;
  }
}

.btn-thin{
  padding:0;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1em;
  color: none !important;
  border:none;
  background: none;
  cursor: pointer;

  &::after {
    max-width: 100%;
  height: 2px;
  display: block;
  content: "";
  background: linear-gradient(-90deg, #CABBE9 0%, #ffcef3 50%, #A1EAFB 100%);
  opacity: 0.5;
  margin-bottom: -6px;
  margin-top: 1px;
  transition: opacity 0.5s linear;
  }

  &:hover::after{
    opacity: 1;
  }
}

.bnw{
    &::after{
      background: linear-gradient(-90deg, gray 0%, gray 50%, gray 100%);
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
