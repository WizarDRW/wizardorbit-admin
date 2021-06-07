import ApiService from "@/core/services/api.service";
// actions GET
export const USER = "user";
export const GET_API_USER = "getApiUser";
export const USERS = "users";
export const GET_API_USERS = "getApiUsers";

// actions POST
export const POST_API_USER = "postApiUser";
// actions PUT
export const PUT_API_USER = "putApiUser";
export const PUT_API_USER_STATUS = "putApiUserStatus";
// actions DELETE
export const DELETE_API_USER = "deleteApiUser";

// mutations
const SET_USER = "setUser"
const SET_USERS = "setUsers"
const SET_POST_API_USER = "setPostApiUser"
const SET_PUT_API_USER = "setPutApiUser"
const SET_PUT_API_USER_STATUS = "setPutApiUserStatus"
const SET_DELETE_API_USER = "setDeleteApiUser"

export default {
    state: {
        user_data: null,
        users: null
    },
    getters: {
        getUser(state) {
            return state.user_data
        },
        getUsers(state) {
            return state.users;
        }
    },
    actions: {
        [USER](context, payload) {
            context.commit(SET_USER, payload)
        },
        [GET_API_USER]: async (context, id) => {
            var data = (await ApiService.get(`users/id/${id}`)).data
            context.commit(SET_USER, data);
        },
        [USERS]: (context, payload) => {
            context.commit(SET_USERS, payload);
        },
        [GET_API_USERS]: async (context) => {
            var response = (await ApiService.get(`users`))
            context.commit(SET_USERS, response.data);
            return response.status;
        },
        [POST_API_USER]: async (context, payload) => {
            var response = (await ApiService.post("users", payload))
            context.commit(SET_POST_API_USER, response.data)
            return response.status;
        },
        [PUT_API_USER]: async (context, payload) => {
            var response = (await ApiService.put(`users/id/${payload._id}`, payload))
            context.commit(SET_PUT_API_USER, response.data)
            return response.status;
        },
        [PUT_API_USER_STATUS]: async (context, payload) => {
            var response = (await ApiService.put(`users/status/${payload._id}`, payload))
            context.commit(SET_PUT_API_USER_STATUS, response.data)
            return response.status;
        },
        [DELETE_API_USER]: async (context, payload) => {
            var response = (await ApiService.delete(`users/id/${payload}`))
            context.commit(SET_DELETE_API_USER, response.data)
            return response.status;
        },
    },
    mutations: {
        [SET_USER](state, payload) {
            state.user_data = payload;
        },
        [SET_USERS]: (state, payload) => {
            state.users = payload;
        },
        [SET_POST_API_USER]: (state, payload) => {
            if (state.users) state.users.push(payload);
        },
        [SET_PUT_API_USER]: (state, payload) => {
            if (state.users) state.users[state.users.findIndex(x => x._id == payload._id)] = payload;
        },
        [SET_PUT_API_USER_STATUS]: (state, payload) => {
            if (state.users) state.users[state.users.findIndex(x => x._id == payload._id)].status = payload.status;
        },
        [SET_DELETE_API_USER]: (state, payload) => {
            if (state.users) state.users.splice(state.users.findIndex(x => x._id == payload), 1);
        },
    }
}