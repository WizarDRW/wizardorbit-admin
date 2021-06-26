import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module.js";
import chapter from "./chapter.module.js";
import draft from "./draft.module.js";
import forum from "./forum.module.js";
import news from "./news.module.js";
import option from "./option.module.js";
import category from "./category.module.js";
import library from "./library.module.js";
import log from "./log.module.js";
import user from './user.module.js';
import useroption from './useroption.module.js';
import theme from './theme.module.js';
import multipart from './multipart.module.js';
import about from './about.module.js';

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
    log,
    user,
    useroption,
    theme,
    multipart,
    draft,
    about
  }
});
