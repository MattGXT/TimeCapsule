<template>
  <transition name="modal">
    <div class="modal-mask" v-show="isShow">
      <div class="model-wrapper" @click="this.$emit('closeModal')">
        <div class="container-modal" @click.stop="">
          <button class="btn-close" @click="this.$emit('closeModal')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
              ></path>
            </svg>
          </button>
          <h1>请验证您的邮箱</h1>
          <div class="modal-content"></div>
          <m-btn thin @click="resendEmail()" :disabled="disabled"
            >没收到？再发送一次</m-btn> <span class="countdown" v-show="countStart">{{ time }}s</span>
          
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { useStore } from "vuex";
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    return {
      token: store.state.token,
    };
  },
  name: "m-modal",
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    email:String
  },
  data() {
    return { time: 60, countStart: false, disabled: false };
  },
  watch: {
    time: function(newVal) {
      if (newVal === "00") {
        this.countStart = false;
      }
    },
  },
  methods: {
    countdown(seconds) {
      seconds = parseInt(seconds);
      var time = setInterval(() => {
        if (seconds < 1) {
          clearInterval(time);
          this.disabled = false;
          this.countStart = false;
          return;
        }
        seconds = seconds < 10 ? "0" + seconds : seconds;
        seconds -= 1;
        this.time = seconds;
      }, 1000);
    },

    resendEmail() {
      if (this.disabled) return;
      this.countdown(60);
      this.countStart = true;
      this.disabled = true;
      if (this.email === "") return
      axios
        .post("http://localhost:3000/resend", {email:this.email})
        .then((res) => {
          if (res.status === 200) {
            console.log("Successful");
          }
        })
        .catch((error) => {
          if(!error?.response?.status){
            this.$emit("alert","稍等一下，网络可能有些问题")
            return
          }
          switch (error.response.status){
            case 500:
              this.$emit("alert","系统错误")
              break
            default:
              this.$emit("alert","未知错误")
          }
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.model-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container-modal {
  position: relative;
  min-width: 400px;
  width: 50vw;
  border-radius: 4px;
  background-color: #fdfdfd;
  padding: 1em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  text-align: center;
  margin: 0 auto;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

h1 {
  margin: 0 auto;
  text-align: center;
  padding-bottom: 15px;
}

.modal-content {
  display: flex;
  width: 100%;

  div:nth-child(1) {
    flex: 1 1 40%;
    border-right: 2px solid rgba(0, 0, 0, 0.12);

    img {
      max-width: 100%;
      padding: auto;
    }
  }

  .modal-content-right {
    flex: 1 1 60%;
    width: 100%;
    padding: 1em;
    font-size: 18px;
    display: flex;
    flex-direction: column;

    .modal-content-right-bottom {
      margin-top: auto;
      text-align: center;
    }
  }
}

p {
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
}

.btn-close {
  padding: 0;
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;

  svg {
    width: 28px;
    fill: rgba(0, 0, 0, 0.12);
  }

  &:hover > svg {
    fill: gray;
  }
}

img {
  max-width: auto;
}
</style>
