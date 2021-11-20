import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            token:window.localStorage.getItem('token'),
            mateId:window.localStorage.getItem('mateId')
        }
    },
    mutations: {
        setToken(state,token) {
            state.token = token
        },
        logout(state) {
            state.token = null
            state.mateId = ""
        },
        setMateId(state,Id) {
            state.mateId = Id
        }
    }
})
