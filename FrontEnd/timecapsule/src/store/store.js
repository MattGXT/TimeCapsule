import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            token:window.localStorage.getItem('token')
        }
    },
    mutations: {
        setToken(state,token) {
            state.token = token
        },
        logout(state) {
            state.token = null
        }
    }
})
