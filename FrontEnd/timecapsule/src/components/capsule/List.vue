<template>
<transition name = "fadeHeight" mode="out-in">
  <div class="contatiner-message" :class="{'message-loading':loading,'message-notloading':!loading}" ref="containerMessage" :style="{ '--outHeight': outHeight }">
    <h1>{{ title }}</h1>
    
    <div
      class="timeline"
      v-show="lists.length !== 0"
      ref="container"
      :style="{ '--containerHeight': height }"
    >
      <div class="timeline_item" :key="list._id" v-for="list in lists">
        <div class="timeline_item_content">
          <div class="item_row">
            <div>
              {{
                isSendbox
                  ? sendDate(list.availableAt)
                  : sendDate(list.createdAt)
              }}
            </div>
            <div>{{ list.content }}</div>
          </div>
        </div>
        <div class="timeline_item_divider">
          <div class="item_dot">
            <div
              :class="{
                pink: list.isRead,
                blue: !list.isRead,
                dot_send: isSendbox,
                dot: !isSendbox,
              }"
              @click="read(list._id)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <transition>
      <div class="loader" v-show="loading"></div>
    </transition> 
      

    <div v-if="!loading && lists.length === 0">
      {{
        isSendbox
          ? "您还没有埋下过胶囊哦。点击上方的加号尝试一下吧！"
          : "您没有已经打开过的胶囊哦。再等等吧，也许明天就有了呢？"
      }}
    </div>
  </div>
  </transition>
</template>

<script>
import axios from "axios";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
    };
  },
  name: "CapsuleCreate",
  components: {},
  props: {
    lists: Array,
    isSendbox: { type: Boolean, default: false },
    title: { type: String, default: "时间胶囊" },
    loading: { type: Boolean, default: false },
    page: Number,
    amount: Number,
  },
  data() {
    return {
      height: "",
      outHeight:""
    };
  },
  watch: {
    loading:function(newVal){
      if(newVal === true){
        this.outHeight = this.$refs.containerMessage.offsetHeight + "px";
      }
    }
  },
  updated() {
    this.matchHeight();
  },
  mounted() {

    let container = this.$refs.container;
    container.addEventListener("scroll", () => {
      let scrollHeight = container.scrollHeight;
      let clientHeight = container.clientHeight;
      let scrollTop = container.scrollTop;
      if (scrollTop + clientHeight > scrollHeight - 1) {
        this.$emit("getNext");
      }
    });
  },
  created() {},
  activated() {},
  unmounted() {
    window.removeEventListener("scroll", this.$refs.container);
  },

  methods: {
    sendDate(date) {
      const d = new Date(date);
      return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
    },

    matchHeight() {
      var heightString = this.$refs.container.scrollHeight;
      this.height = heightString + "px";
    },

    read(id) {
      if (this.isSendbox) {
        return;
      }
      axios
        .post(
          "http://localhost:3000/read-capsule",
          { _id: id },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            this.$emit("refresh");
          }
        })
        .catch((error) => {
          switch (error.response.status) {
            case 500:
              this.$emit("alert", "ops！出了一些小问题");
              break;
            default:
              this.$emit("alert", "未知错误");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.contatiner-message {
  width: 400px;
  border-radius: 4px;
  background-color: #fdfdfd;
  padding: 1em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  text-align: left;
  margin: 0 auto;
  z-index: 0;
  height: auto;
 transition: max-height 1s;
}

.message-loading{
  max-height:80vh;
}

.message-notloading{
  max-height: 60vh;
}

.timeline {
  position: relative;
  padding-top: 24px;
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 50vh;
  
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    height: 40px;
    border-radius: 8px;
    border: 4px solid transparent;
    background-clip: content-box;
    background-color: rgba(0, 0, 0, 0.12);
  }
  &::before {
    content: "";
    left: 39px;
    background: rgba(0, 0, 0, 0.12);
    height: var(--containerHeight);
    width: 2px;
    position: absolute;
    top: 0;
  }

  .timeline_item {
    display: flex;
    padding-bottom: 24px;
    flex-direction: row-reverse !important;

    .timeline_item_content {
      height: 100%;
      flex: 1 1 auto;
      .item_row {
        display: flex;
        flex-wrap: wrap;
        flex: 1 1 auto;
        margin: -12px;
        div:nth-child(1) {
          flex: 0 0 40%;
          max-width: 35%;
          padding: 14px;
          color: rgba(0, 0, 0, 0.6);
        }
        div:nth-child(2) {
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
          padding: 14px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  .timeline_item_divider {
    position: relative;
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    .item_dot {
      align-self: start;
      height: 24px;
      left: calc(50% - 12px);
      width: 24px;
      background: #fff;
      z-index: 2;
      border-radius: 50%;
      box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
        0 1px 3px 0 rgb(0 0 0 / 12%);

      .dot {
        height: 18px;
        margin: 3px;
        width: 18px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #ffcef3;
          border-color: #ffcef3;
        }
      }

      .pink {
        background-color: #ffcef3;
        border-color: #ffcef3;
      }

      .blue {
        background-color: #a1eafb;
        border-color: #a1eafb;
        cursor: pointer;
      }

      .dot_send {
        cursor: default;
        height: 18px;
        margin: 3px;
        width: 18px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

h1 {
  padding: 0;
  margin: 0 0 15px 0;
}

.loader {
  --clock-color: #a1eafb;
  --clock-width: 2rem;
  --clock-radius: calc(var(--clock-width) / 2);
  --clock-minute-length: calc(var(--clock-width) * 0.4);
  --clock-hour-length: calc(var(--clock-width) * 0.2);
  --clock-thickness: 0.2rem;

  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--clock-width);
  height: var(--clock-width);
  border: 3px solid var(--clock-color);
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: calc(var(--clock-radius) * 0.25);
    width: var(--clock-thickness);
    background: var(--clock-color);
    border-radius: 10px;
    transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
    animation: spin infinite linear;
  }

  &::before {
    height: var(--clock-minute-length);
    animation-duration: 2s;
  }

  &::after {
    top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
    height: var(--clock-hour-length);
    animation-duration: 15s;
  }
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}


</style>
