import ApiService from "@/core/services/api.service"
// action types
export const LIBRARY = "library";
export const GET_API_LIBRARY = "getApiLibrary"

// mutation types
export const SET_LIBRARY = "setLibrary";

export default {
    state: {
        library: null
    },
    getters: {
        getLibrary(state) {
            return state.library;
        }
    },
    actions: {
        [LIBRARY](state, payload) {
            state.commit(SET_LIBRARY, payload);
        },
        async [GET_API_LIBRARY](state, id){
            var data = (await ApiService.get(`mylibraries/id/${id}`)).data
            state.commit(SET_LIBRARY, data);
        }
    },
    mutations: {
        [SET_LIBRARY](state, payload) {
            state.library = payload;
        },
    }
};
