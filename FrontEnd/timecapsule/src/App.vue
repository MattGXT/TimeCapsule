<template>
  <nav>
    <router-link to='/'>Home</router-link> |
    <button @click="logout">Logout</button>
  </nav>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
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
  methods:{
    logout(){
      this.storeLogout()
      this.$router.push('/login')
    }
  }
}
</script>


<style>
#app {
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffffff;
  font-size: 15px;
}

nav{
  height: 56px;
  background:#A1EAFB;
  display: flex;
  align-items: center;
}

main{
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
  transform: translateX(2em);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
</style>
