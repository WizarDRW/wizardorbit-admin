import ApiService from "@/core/services/api.service";

export const DRAFT = "draft";
export const GET_API_DRAFT = "getApiDraft";
export const GET_API_DRAFTS = "getApiDrafts";
export const GET_API_USER_DRAFTS = "getApiUserDrafts";

export const POST_API_DRAFT = "postApiDraft";
export const PUT_API_DRAFT = "putApiDraft";
export const DELETE_API_DRAFT = "deleteApiDraft";

const SET_DRAFT = "setDraft"
const SET_DRAFTS = "setDrafts"
const SET_USER_DRAFTS = "setUserDrafts"

const SET_POST_API_DRAFTS = "setPostApiDraft"
const SET_PUT_API_DRAFTS = "setPutApiDraft"
const SET_DELETE_API_DRAFTS = "setDeleteApiDraft"

export default {
    state: {
        draft: null,
        drafts: null,
        user_drafts: null
    },
    getters: {
        getDraft: (state) => state.draft,
        getDrafts: (state) => state.drafts,
        getUserDrafts: (state) => state.user_drafts
    },
    actions: {
        [DRAFT]: (context, payload) => {
            context.commit(SET_DRAFT, payload);
        },
        [GET_API_DRAFT]: async (context, payload) => {
            var response = (await ApiService.get(`drafts/id/${payload}`));
            context.commit(SET_DRAFT, response.data)
            return response.status;
        },
        [GET_API_DRAFTS]: async (context) => {
            var response = (await ApiService.get(`drafts/`));
            context.commit(SET_DRAFTS, response.data)
            return response.status;
        },
        [GET_API_USER_DRAFTS]: async (context, payload) => {
            var response = (await ApiService.get(`drafts/userid/${payload}`));
            context.commit(SET_USER_DRAFTS, response.data)
            return response.status;
        },
        [POST_API_DRAFT]: async (context, payload) => {
            var response = (await ApiService.post(`drafts/`, payload));
            context.commit(SET_POST_API_DRAFTS, response.data)
            return response.status;
        },
        [PUT_API_DRAFT]: async (context, payload) => {
            var response = (await ApiService.put(`drafts/id/${payload._id}`, payload));
            context.commit(SET_PUT_API_DRAFTS, response.data)
            return response.status;
        },
        [DELETE_API_DRAFT]: async (context, payload) => {
            var response = (await ApiService.delete(`drafts/id/${payload}`));
            context.commit(SET_DELETE_API_DRAFTS, response.data)
            return response.status;
        },
    },
    mutations: {
        [SET_DRAFT]: (state, payload) => {
            state.draft = payload;
        },
        [SET_DRAFTS]: (state, payload) => {
            state.drafts = payload;
        },
        [SET_USER_DRAFTS]: (state, payload) => {
            state.user_drafts = payload;
        },
        [SET_POST_API_DRAFTS]:  (state, payload) => {
            if (state.drafts) state.drafts.push(payload);
            if (state.user_drafts) state.user_drafts.push(payload);
        },
        [SET_PUT_API_DRAFTS]:  (state, payload) => {
            if (state.drafts) state.drafts[state.drafts.findIndex(x=> x._id == payload._id)] = payload;
            if (state.user_drafts) state.user_drafts[state.user_drafts.findIndex(x=> x._id == payload._id)] = payload;
        },
        [SET_DELETE_API_DRAFTS]:  (state, payload) => {
            if (state.drafts) state.drafts.splice(state.drafts.findIndex(x=> x._id == payload), 1);
            if (state.user_drafts) state.user_drafts.splice(state.user_drafts.findIndex(x=> x._id == payload), 1);
        },
    }
}