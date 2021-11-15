<template>
  <transition name="fade">
    <div
      class="alert"
      v-show="visible"
      :modelValue="alertDisplay"
      @update:modelValue="alertDisplay = $event"
    >
      <div class="alert_wrapper">
        <svg
          class="alert_logo"
          :class="{'success_alert_logo':success}"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M9,7V9H11V17H13V9H15V7H9Z"></path>
        </svg>
        <div class="alert_content">{{ description }}</div>
        <div class="alert_border_color" :class="{'success_alert':success}"></div>
        <button class="alert_button" type="button" @click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :class="{'success_alert_logo':success}"
            role="img"
            aria-hidden="true"
            class="v-icon__svg"
          >
            <path
              d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "m-alert",
  components: {},
  props: {
    description: String,
    modelValue: {
      type: Boolean,
      default: false,
    },
    success:{
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      alertDisplay: Boolean,
      timeout: null,
    };
  },
  methods: {
    close() {
      clearTimeout(this.timeout);
      this.timeout = null;
      this.$emit("update:modelValue", false);
    },
    autoclose() {
      if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.timeout = null;
          this.$emit("update:modelValue", false);
        }, 5000);
      }
    },
  },
  computed: {
    visible() {
      if (this.modelValue) this.autoclose();
      return this.modelValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  background-color: #fdfdfd;
  position: fixed;
  padding: 0;
  margin: 0;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  margin-bottom: 16px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 4px;
  bottom: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.alert_wrapper {
  display: flex;
  align-items: center;
}

.alert_content {
  flex: 1 1 auto;
  min-width: 200px;
  text-align: left;
  font-size: 16px;
}

.alert_border_color {
  position: absolute;
  background-color: #ffcef3;
  border-color: #ffcef3;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-style: solid;
  border-width: 4px;
  content: "";
  bottom: 0;
  top: 0;
}

button {
  background: transparent;
  padding: 0;
  margin-right: 8px;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    fill: #ffcef3;
  }

  &:hover > svg {
    fill: #cabbe9;
  }
}

.alert_logo {
  width: 44px;
  fill: #ffcef3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.success_alert{
  background-color: #A1EAFB;
  border-color: #A1EAFB;
}

.success_alert_logo{
  fill: #A1EAFB;
}
</style>
