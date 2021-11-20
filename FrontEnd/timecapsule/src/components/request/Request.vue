<template>
  <div class="container-requests">
    <div class="container-invites">
      <div class="email-input">
        <m-input v-model="email" simple hint="知道他/她的Email吗？" />
      </div>

      <button type="button" @click="requestCreate">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M13 17H17V14L22 18.5L17 23V20H13V17M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H11V18H4V8L12 13L20 8V14H22V6A2 2 0 0 0 20 4M12 11L4 6H20Z"
          ></path>
        </svg>
      </button>
    </div>

    
    <div class="main-container container-applications">
      <h1>来自Ta们的请求</h1>
      <div class="application" v-for="content in contents" :key="content._id" v-show="contents.length > 0">
        <div>{{ content.name }}-{{ content.email }}</div>

        <button type="button" @click="requestApprove(content._id)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      token: store.state.token,
      setToken: (token) => store.commit("setToken", token),
    };
  },
  name: "RequestComponent",
  components: {},
  data() {
    return {
      contents: Array,
      email: "",
      testData: [
        { name: "matt", email: "Hello@qq.com" },
        { name: "matt", email: "Hello@qq.com" },
        { name: "matt", email: "Hello@qq.com" },
      ],
    };
  },
  created() {
    this.requestGet();
  },

  methods: {
    requestGet() {
      axios
        .get("http://localhost:3000/get-request", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.contents = res.data;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          }
        });
    },

    requestApprove(id) {
      const request = { _id: { $oid: id } };
      axios
        .post("http://localhost:3000/approve-request", request, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$emit("alert","开始和她/他分享吧",true)
          }
          console.log(res);
        })
        .catch((error) => {
          switch (error.response.status){
            case 401:
              this.$emit("alert","请重新登录")
              break
            case 400:
              this.$emit("alert","该请求不存在")
              break
            default:
              this.$emit("alert","未知错误")
          }
        });
    },

    requestCreate() {
      if (this.email === "") {
        this.$emit("alert","请输入邮箱地址")
        return;
      }
      const user = { targetEmail: this.email };
      axios
        .post("http://localhost:3000/create-request", user, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$emit("alert","已发送。等待他/她的回应哦",true)
          }
          console.log(res);
        })
        .catch((error) => {
          switch (error.response.status){
            case 401:
              this.$emit("alert","请重新登录")
              break
            case 400:
              this.$emit("alert","该用户不存在")
              break
            case 403:
              this.$emit("alert","您已经发送过请求了哦")
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
.container-requests {
  display: flex;
  flex-direction: column;
  margin:0 auto;
}

.container-invites {
  width: 400px;
  border-radius: 4px;
  background-color: #fdfdfd;
  padding: 0.8em 1em 0.3em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12) !important;
  text-align: left;
  margin: 0 auto;
  z-index: 0;
  margin: 5px 0;
  display: flex;
  align-items: center;

  .email-input {
    flex: 1 1 auto;
  }
  button {
    padding: 0;
    padding-left: 15px;
    flex: 0;
    background: transparent;
    border: none;
    cursor: pointer;

    svg {
      width: 28px;
      fill: rgba(0, 0, 0, 0.2);
    }
    &:hover > svg {
      fill: #ffcef3;
    }
  }
}

h1 {
  margin: 0;
  margin-bottom: 10px;
}

.container-applications {
  display: flex;
  flex-direction: column;
}

.application {
  div:nth-child(1) {
    flex: 1 1 auto;
    font-size: 1.2em;
    color:rgba(0, 0, 0, 0.6)
  }
  display: flex;

  button {
    padding: 0;
    flex: 0;
    background: transparent;
    border: none;
    cursor: pointer;

    svg {
      width: 2em;
      fill: rgba(0, 0, 0, 0.2);
    }
    &:hover > svg:nth-child(1) {
      fill: #ffcef3;
    }
    &:hover > svg:nth-child(2) {
      fill: #a1eafb;
    }
  }
}
</style>
