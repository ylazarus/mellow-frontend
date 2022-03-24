import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store'
import { focusDirective } from './directives'
import "../styles/scss/main.scss"

import ElementPlus from 'element-plus'

const app = createApp(App)

app.directive('focus', focusDirective)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
