<template>
  <div class="container-capsule">
    <div>
      <m-textarea
        placeholder="今天想说些什么呢？"
        v-model="content"
      ></m-textarea>
      <input
        type="range"
        class="create_range"
        min="0"
        max="4"
        step="1"
        v-model="availableAt"
      />
      <div class="range_label">
        <span
          >可以在<b>{{ availableYear }}</b
          >后打开它</span
        >
      </div>
    </div>
    <div class="footer">
      <m-btn thin type="button" @click="create">
        准备好了？
      </m-btn>
    </div>
  </div>
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
  data() {
    return {
      availableAt: 0,
      content: "",
    };
  },

  computed: {
    availableYear() {
      if (this.availableAt == 0) return "半年";
      if (this.availableAt == 1) return "一年";
      if (this.availableAt == 2) return "三年";
      if (this.availableAt == 3) return "五年";
      if (this.availableAt == 4) return "十年";
      return "时长";
    },
  },

  methods: {
    create() {
      if (this.availableAt == null || this.content === "") {
        this.$emit("alert", "不要发送空白消息哦");
        return;
      }
      const data = {
        availableAt: parseInt(this.availableAt),
        content: this.content,
      };
      axios
        .post("http://localhost:3000/create-capsule", data, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$emit("alert","您的胶囊已经埋好了。以后再来看看吧",true)
          }
        })
        .catch((error) => {
          switch (error.response.status){
            case 400:
              this.$emit("alert","账号错误，请重新登录")
              break
            default:
              this.$emit("alert","未知错误")
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-capsule {
  width: 400px;
  border-radius: 4px;
  background-color: #fdfdfd;
  padding: 1em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  text-align: left;
  margin: 0 auto;
  z-index: 0;
}

label {
  display: inline-block;
}

.create_range {
  width: 100%;
  margin: 20px 0 0 0;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    background: #ffcef3;
    border-radius: 1px;
    border: 0px solid #000000;
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #cabbe9;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #fdfdfd;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
  }
}

.footer {
  text-align: center;
}

.range_label {
  margin-left: 10px;
  text-align: left;
  span {
    font-size: 0.8em;
  }
}

</style>
