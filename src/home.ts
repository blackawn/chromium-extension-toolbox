import { createApp } from 'vue'
import './style.css'
import store from './store'
import '~/components/PopupMessage/src/popupMessage'
import App from './Home.vue'

createApp(App)
  .use(store)
  .mount('#root')
