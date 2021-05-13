import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import ApiService from './core/services/api.service'
import store from './core/services/store/store'
import VueMoment from 'vue-moment'
import Katex from 'vue-katex-auto-render'
import { CURRENT_USER } from "./core/services/store/auth.module";

Vue.config.productionTip = false

ApiService.init();
const moment = require('moment')
require('moment/locale/tr')
Vue.use(VueMoment, {
  moment
});

Vue.directive('katex', Katex);

router.beforeEach(async (to, from, next) => {
  await store.dispatch(CURRENT_USER)
  if (store.getters.currentUser)
    next()
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
