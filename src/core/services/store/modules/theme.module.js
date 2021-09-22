import ApiService from '@/core/services/api.service';

export const GET_API_THEME = "getApiTheme";
export const GET_API_THEMES = "getApiThemes";

const SET_THEME = "setTheme"
const SET_THEMES = "setThemes"

export default {
    state: {
        theme: null,
        themes: null
    },
    getters: {
        getApiTheme: (state) => state.theme,
        getThemes: (state) => state.themes
    },
    actions: {
        [GET_API_THEME]: async (context, id) => {
            var response = await ApiService.get(`themes/id/${id}`)
            context.commit(SET_THEME, response.data);
            return response.status;
        },
        [GET_API_THEMES]: async (context) => {
            var response = await ApiService.get(`themes`)
            context.commit(SET_THEMES, response.data);
            return response.status;
        },
    },
    mutations: {
        [SET_THEME]: (state, payload) => {
            state.theme = payload;
        },
        [SET_THEMES]: (state, payload) => {
            state.themes = payload;
        },
    }
}