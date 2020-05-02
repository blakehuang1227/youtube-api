import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-TW'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI, { locale })
library.add(fas, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
