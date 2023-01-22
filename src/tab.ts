import { createApp } from 'vue';
import './style.css';
import store from './store';
import { longPress } from '~/directive/long-press';
import App from './Tab.vue';

createApp(App)
  .use(store)
  .directive('long-press', longPress)
  .mount('#root');
