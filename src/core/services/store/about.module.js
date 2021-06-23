import ApiService from '../api.service'

export const ABOUT = "about";
export const GET_API_ABOUT = "getApiAbout";
export const RELEASE = "release";
export const GET_API_RELEASE = "getApiRelease";
export const GET_API_ABOUTS = "getApiAbouts";
export const GET_API_RELEASES = "getApiReleases";

export const POST_API_ABOUT = "postApiAbout";
export const PUT_API_ABOUT = "putApiAbout";
export const DELETE_API_ABOUT = "deleteApiAbout";

export const POST_API_RELEASE = "postApiRelease";
export const PUT_API_RELEASE = "putApiRelease";
export const DELETE_API_RELEASE = "deleteApiRelease";

const SET_ABOUT = "setAbout";
const SET_ABOUTS = "setAbouts";
const SET_RELEASE = "setRelease";
const SET_RELEASES = "setReleases";
const SET_POST_API_RELEASES = "setPostApiReleases";

export default {
    state: {
        about: null,
        release: null,
        abouts: null,
        releases: null
    },
    getters: {
        getAbout: (state) => state.about,
        getRelease: (state) => state.release,
        getAbouts: (state) => state.abouts,
        getReleases: (state) => state.releases,
    },
    actions: {
        [ABOUT]: (context, payload) => {
            context.commit(SET_ABOUT, payload);
        },
        [GET_API_ABOUT]: async (context, id) => {
            var response = await ApiService.get(`abouts/id/${id}`);
            context.commit(SET_ABOUT, response.data);
            return response.status;
        },
        [GET_API_ABOUTS]: async (context) => {
            var response = await ApiService.get(`abouts/`);
            context.commit(SET_ABOUTS, response.data);
            return response.status;
        },
        [RELEASE]: (context, payload) => {
            context.commit(SET_RELEASE, payload);
        },
        [GET_API_RELEASE]: async (context, id) => {
            var response = await ApiService.get(`abouts/release/id/${id}`);
            context.commit(SET_RELEASE, response.data);
            return response.status;
        },
        [GET_API_RELEASES]: async (context) => {
            var response = await ApiService.get(`abouts/releases`);
            context.commit(SET_RELEASES, response.data);
            return response.status;
        },
        [POST_API_RELEASE]: async (context, payload) => {
            var response = await ApiService.post(`abouts/`, payload);
            context.commit(SET_POST_API_RELEASES, response.data);
            return response.status;
        }
    },
    mutations: {
        [SET_ABOUT]: (state, payload) => {
            state.about = payload;
        },
        [SET_ABOUTS]: (state, payload) => {
            state.abouts = payload;
        },
        [SET_RELEASE]: (state, payload) => {
            state.release = payload;
        },
        [SET_RELEASES]: (state, payload) => {
            state.releases = payload;
        },
        [SET_POST_API_RELEASES]: (state, payload) => state.releases ? state.releases.push(payload) : null,
    }
}
