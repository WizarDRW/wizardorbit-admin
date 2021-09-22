import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.module.js";
import chapter from "./modules/chapter.module.js";
import draft from "./modules/draft.module.js";
import forum from "./modules/forum.module.js";
import news from "./modules/news.module.js";
import option from "./modules/option.module.js";
import category from "./modules/category.module.js";
import library from "./modules/library.module.js";
import log from "./modules/log.module.js";
import user from './modules/user.module.js';
import useroption from './modules/useroption.module.js';
import theme from './modules/theme.module.js';
import multipart from './modules/multipart.module.js';
import about from './modules/about.module.js';
import i18n from './modules/i18n.module.js';
import crudqm from './modules/crudqm.module.js';

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
    about,
    i18n,
    crudqm
  }
});
