import { createApp } from 'vue';
import './style.css';
import store from './store';
import '~/components/popup-message/src/popup-message';
import { longPress } from '~/directive/long-press';
import App from './Tab.vue';

createApp(App)
  .use(store)
  .directive('long-press', longPress)
  .mount('#root');
