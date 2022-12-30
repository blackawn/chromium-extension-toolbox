import { createApp } from 'vue'
import './style.css'
import store from './store'
import App from './Popup.vue'

createApp(App)
  .use(store)
  .mount('#root')
