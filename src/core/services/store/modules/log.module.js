import ApiService from "@/core/services/api.service";

// actions
export const LOG = "log"
export const GET_API_LOG = "getApilog"
export const LOGS = "logs"
export const GET_API_LOGS = "getApilogs"
export const USER_LOGS = "userLogs"
export const GET_API_USER_LOGS = "getApiUserlogs"
export const POST_API_LOG = "postApiLog"
export const PUT_API_LOG = "putApiLog"
export const DELETE_API_LOG = "deleteApiLog"

// mutations
const SET_LOG = "setLog"
const SET_LOGS = "setLogs"
const SET_USER_LOGS = "setUserLogs"
const SET_POST_LOG = "setPostLog"
const SET_PUT_LOG = "setPutLog"
const SET_DELETE_LOG = "setDeleteLog"

export default {
    state: {
        log: [],
        logs: null,
        user_logs: null
    },
    getters: {
        getLog: (state) => state.log,
        getLogs: (state) => state.logs,
        getUserLog: (state) => state.user_logs
    },
    actions: {
        // GET
        [LOG]: (context, payload) => context.commit(SET_LOG, payload),
        [GET_API_LOG]: async (context, id) => context.commit(SET_LOG, (await ApiService.get(`logs/id/${id}`)).data),
        [LOGS]: (context, payload) => context.commit(SET_LOGS, payload),
        [GET_API_LOGS]: async (context) => context.commit(SET_LOGS, (await ApiService.get(`logs`)).data),
        [USER_LOGS]: (context, payload) => context.commit(SET_LOGS, payload),
        [GET_API_USER_LOGS]: async (context, userid) => context.commit(SET_LOGS, (await ApiService.get(`logs/userid/${userid}`)).data),
        // POST
        [POST_API_LOG]: async (context, payload) => {
            var response = (await ApiService.post("logs", payload))
            context.commit(SET_POST_LOG, response.data);
            return response.status;
        },
        // PUT
        [PUT_API_LOG]: async (context, payload) => {
            var response = (await ApiService.put(`logs/id/${payload._id}`, payload))
            context.commit(SET_PUT_LOG, response.data);
            return response.status;
        },
        // PUT
        [DELETE_API_LOG]: async (context, id) => {
            var response = (await ApiService.delete(`logs/id/${id}`))
            context.commit(SET_DELETE_LOG, response.data);
            return response.status;
        }
    },
    mutations: {
        [SET_LOG]: (state, payload) => state.log = payload,
        [SET_LOGS]: (state, payload) => state.logs = payload,
        [SET_USER_LOGS]: (state, payload) => state.user_logs = payload,
        [SET_POST_LOG]: (state, payload) => state.logs ? state.logs.push(payload) : null,
        [SET_PUT_LOG]: (state, payload) => {
            var index = state.logs.findIndex(x => x._id == payload._id)
            state.logs[index] = payload;
        },
        [SET_DELETE_LOG]: (state, payload) => {
            var index = state.logs.findIndex(x => x._id == payload)
            state.logs.splice(index, 1);
        }
    }
}