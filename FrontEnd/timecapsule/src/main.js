import { createApp } from 'vue'
import store from './store/store'
import App from './App.vue'
import router from './router'
import comp from '../index.js'

const app = createApp(App).use(router)

app.use(store)
comp.install(app)
app.mount('#app')