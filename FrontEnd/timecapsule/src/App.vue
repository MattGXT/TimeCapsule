<template>
  <nav>
    <div class="start">
      <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,7V9H11V17H13V9H15V7H9Z"></path></svg>
    </div>
    <div class="middle">
      <ul>
        <li>
          <button v-show="token !== null && mateId !== null" @click="add()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
            </svg>
          </button>
        </li>
        <li>
          <button @click="home()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 20C7.6 20 4 16.4 4 12S7.6 4 12 4 20 7.6 20 12 16.4 20 12 20M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M11 14H13V17H16V12H18L12 7L6 12H8V17H11V14"
              ></path>
            </svg>
          </button>
        </li>
        <li>
          <button v-show="token !== null && mateId !== null" @click="sendBox()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12,7L17,12H14V16H10V12H7L12,7M19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21M19,19V5H5V19H19Z"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
    <div class="end">
      <button class="btn-logout" @click="logout()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"
          ></path>
        </svg>
      </button>
    </div>
  </nav>
  <main>
    <router-view v-slot="{ Component }" v-on:alert="showAlert">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <m-alert :description = description v-model = alertDisplay></m-alert>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    return {
      token: computed(() => store.state.token),
      mateId: computed(() => store.state.mateId),

      storeLogout: () => {
        store.commit("logout");
        localStorage.clear();
      },
      setMateId: (mateId) => store.commit("setMateId", mateId),
    };
  },
  data(){
    return{
      description: "",
      alertDisplay: false
    }
  },
  methods: {
    logout() {
      this.storeLogout();
      this.$router.push("/login");
    },

    home() {
      this.$router.push("/");
    },

    add() {
      this.$router.push("/capsule/add");
    },

    sendBox() {
      this.$router.push("/capsule/own");
    },

    showAlert(text){
      this.description = text
      this.alertDisplay = true
    }

  },
};
</script>

<style lang="scss">
#app {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffffff;
  font-size: 15px;
}

nav {
  height: 56px;
  background: #a1eafb;
  display: flex;
  align-items: center;
  div {
    flex:1;
    display: flex;
    

    button {
      background: transparent;
      border: none;
      margin: 0 10px;
      cursor: pointer;

      svg {
        width: 28px;
        fill: #fdfdfd;
      }

      &:hover > svg {
        fill: #ffcef3;
      }
    }

    button.btn-logout {
      margin-left: auto;
    }
  }
}

main {
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0;
  padding: 0;
  min-width: 400px;
  width: auto !important;
  width: 1000px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 0;
}

.logo{
  z-index: 1;
  height: 50px;
  margin-left: 10px;
  fill: #fdfdfd;
}
</style>
