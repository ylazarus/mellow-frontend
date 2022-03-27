import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store'
import { focusDirective } from './directives'
import VCalendar from 'v-calendar';
import Unsplash from 'vue-unsplash'
  

import "../styles/scss/main.scss"


import ElementPlus from 'element-plus'

const app = createApp(App)

app.directive('focus', focusDirective)
app.use(VCalendar, {})
app.use(Unsplash, { accessKey: 'Y2X6Y_wdMpqvaYX_4jgO-dOBqVAsQMQpihsIFNOAX5E' })
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
