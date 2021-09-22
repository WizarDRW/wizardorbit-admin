import ApiService from '../api.service';

export const GET_API_USER_OPTION = "getApiUserOption";
export const GET_API_USER_OPTIONS = "getApiUserOptions";
export const GET_API_USER_ID_OPTION = "getApiUserIdOption";
export const PUT_API_USER_OPTION = "putApiUserOption";

const SET_USER_OPTION = "setUserOption"
const SET_USER_OPTIONS = "setUserOptions"
const SET_USER_ID_OPTION = "setUserIdOption"
const SET_PUT_API_USER_ID_OPTION = "setPutApiUserIdOption"

export default {
    state: {
        option: null,
        options: null,
        user_option: null
    },
    getters: {
        getUserOption: (state) => state.option,
        getUserOptions: (state) => state.options,
        getUserIdOption: (state) => state.user_option
    },
    actions: {
        [GET_API_USER_OPTION]: async (context, id) => {
            var response = await ApiService.get(`useroptions/id/${id}`)
            context.commit(SET_USER_OPTION, response.data);
            return response.status;
        },
        [GET_API_USER_OPTIONS]: async (context) => {
            var response = await ApiService.get(`useroptions`)
            context.commit(SET_USER_OPTIONS, response.data);
            return response.status;
        },
        [GET_API_USER_ID_OPTION]: async (context, userid) => {
            var response = await ApiService.get(`useroptions/userid/${userid}`)
            context.commit(SET_USER_ID_OPTION, response.data);
            return response.status;
        },
        [PUT_API_USER_OPTION]: async (context, payload) => {
            var response = await ApiService.put(`useroptions/id/${payload._id}`, payload);
            context.commit(SET_PUT_API_USER_ID_OPTION, response.data)
            return response.status;
        }
    },
    mutations: {
        [SET_USER_OPTION]: (state, payload) => {
            state.option = payload;
        },
        [SET_USER_OPTIONS]: (state, payload) => {
            state.options = payload;
        },
        [SET_USER_ID_OPTION]: (state, payload) => {
            state.user_option = payload;
        },
        [SET_PUT_API_USER_ID_OPTION]: (state, payload) => {
            state.user_option = payload;
        },
    }
}