import { createStore } from 'vuex'
import boardStore from './modules/board-store.js'
import userStore from './modules/user-store.js'

const store = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        boardStore,
        userStore,
    },
})

export default store
