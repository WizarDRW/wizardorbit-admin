import Vuetify from '@/plugins/vuetify';
import themes from '../../themes'

// action types
export const THEME = "theme";
export const AUTO_THEME = "autoTheme";
export const CHANGE_USER_THEME = "changeUserTheme";

// mutation types
const SET_THEME = "setTheme";

export default {
  state: {
      option: localStorage.getItem("option"),
      theme: localStorage.getItem("theme") ?
          JSON.parse(localStorage.getItem("theme")) : {
              name: "dark",
              isDark: true,
              auto: true
          }
  },
  getters: {
      getOption(state){
          return state.option;
      },
      getTheme(state) {
          return state.theme;
      }
  },
  actions: {
    [THEME](context, theme) {
        localStorage.setItem("theme", JSON.stringify({ auto: false, ...theme }))
        context.commit(SET_THEME, theme)
    },
    [CHANGE_USER_THEME]: (context, status) => {
        context.dispatch('theme', {
            isDark: status,
            name: status ? "dark" : "light",
        });
        if (context.getters.isAuthenticated)
            if (status)
                Vuetify.framework.theme.themes.dark = context.state.user_theme.dark
            else
                Vuetify.framework.theme.themes.light = context.state.user_theme.light
        else
            if (status)
                Vuetify.framework.theme.themes.dark = { ...Vuetify.framework.theme.themes.dark, ...themes.dark };
            else
                Vuetify.framework.theme.themes.light = { ...Vuetify.framework.theme.themes.light, ...themes.light };
    },
  },
  mutations: {
    [SET_THEME](state, theme) {
        var light = Vuetify.framework.theme.themes.light
        Vuetify.framework.theme.themes.light = { ...light, ...themes[theme.name] }
        state.theme = { auto: state.theme.auto ? state.theme.auto : false, ...theme }
        Vuetify.framework.theme.dark = theme.isDark;
    }
  }
};
