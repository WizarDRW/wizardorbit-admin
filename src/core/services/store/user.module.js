import ApiService from "@/core/services/api.service";
// actions
export const USER = "user";
export const GET_API_USER = "getApiUser";

// mutations
export const SET_USER = "setUser"

export default {
    state: {
        user_data: null
    },
    getters: {
        getUser(state) {
            return state.user_data
        }
    },
    actions: {
        [USER](context, payload) {
            context.commit(SET_USER, payload)
        },
        async [GET_API_USER](context, id) {
            var data = (await ApiService.get(`users/id/${id}`)).data
            context.commit(SET_USER, data);
        }
    },
    mutations: {
        [SET_USER](state, payload) {
            state.user_data = payload;
        }
    }
}