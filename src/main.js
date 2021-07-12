import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import ApiService from './core/services/api.service'
import store from './core/services/store/store'
import VueMoment from 'vue-moment'
import VueMeta from 'vue-meta'
import Katex from 'vue-katex-auto-render'
import { VueMasonryPlugin } from "vue-masonry";
import { CURRENT_USER } from "./core/services/store/auth.module";
import VueCookies from 'vue-cookies'
import { i18n } from './core/i18n'

Vue.config.productionTip = false

ApiService.init();
const moment = require('moment')
Vue.use(VueMasonryPlugin);
Vue.use(VueCookies)
Vue.use(VueMoment, {
  moment
});
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
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
  i18n,
  render: h => h(App)
}).$mount('#app')
