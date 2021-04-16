import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import ApiService from './core/services/api.service'
import store from './core/services/store/store'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false

ApiService.init();
const moment = require('moment')
require('moment/locale/tr')
Vue.use(VueMoment, {
  moment
});
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
