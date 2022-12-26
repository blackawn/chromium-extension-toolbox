import { createApp } from 'vue'
import './style.css'
import store from './store'
import '~/components/PopupMessage/src/popupMessage'
import App from './App.vue'

createApp(App)
  .use(store)
  .mount('#root')
