import { loadLanguageAsync } from '../../i18n'
export const LANG = "lang";

const SET_LANG = "setLang";

export default {
    state: {
        defLang: JSON.parse(localStorage.getItem('lang')) ?? {
            name: "en",
            icon: require("@/assets/vendor/svg/en.svg"),
          }
    },
    getters: {
        getLang: (state) => state.defLang,
        getLangName: (state) => state.defLang.name,
    },
    actions: {
        [LANG]: async (context, payload) => {
            await loadLanguageAsync(payload.name);
            localStorage.setItem('lang', JSON.stringify(payload));
            // require(`moment/locale/${payload.name}`);
            context.commit(SET_LANG, payload);
        }
    },
    mutations: {
        [SET_LANG]: (state, payload) => {
            state.defLang = payload;
        }
    }
}