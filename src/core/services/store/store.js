import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import chapter from "./chapter.module";
import forum from "./forum.module";
import news from "./news.module";
import option from "./option.module";
import category from "./category.module";
import library from "./library.module";
import log from "./log.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    chapter,
    forum,
    news,
    option,
    library,
    category,
    log
  }
});
