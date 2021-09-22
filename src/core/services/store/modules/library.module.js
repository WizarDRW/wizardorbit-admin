import ApiService from "@/core/services/api.service"

// action types
export const LIBRARY = "library";
export const GET_API_LIBRARY = "getApiLibrary"
export const LIBRARIES = "libraries";
export const GET_API_LIBRARIES = "getApiLibraries"
export const USER_LIBRARIES = "userLibraries";
export const GET_API_USER_LIBRARIES = "getApiUserLibraries"

export const POST_API_LIBRARY = "postApiLibrary"
export const PUT_API_LIBRARY = "putApiLibrary"
export const DELETE_API_LIBRARY = "deleteApiLibrary"

// mutation types
const SET_LIBRARY = "setLibrary";
const SET_LIBRARIES = "setLibraries";
const SET_USER_LIBRARIES = "setUserLibraries";
const SET_POST_LIBRARY = "setPostLibrary";
const SET_PUT_LIBRARY = "setPutLibrary";
const SET_DELETE_LIBRARY = "setDeleteLibrary";

export default {
    state: {
        library: null,
        libraries: null,
        user_libraries: null
    },
    getters: {
        getLibrary: (state) => state.library,
        getLibraries: (state) => state.libraries,
        getUserLibraries: (state) => state.user_libraries,
    },
    actions: {
        [LIBRARY]: (context, payload) => context.commit(SET_LIBRARY, payload),
        [GET_API_LIBRARY]: async (context, id) => context.commit(SET_LIBRARY, (await ApiService.get(`libraries/id/${id}`)).data),
        [LIBRARIES]: (context, payload) => context.commit(SET_LIBRARIES, payload),
        [GET_API_LIBRARIES]: async (context) => context.commit(SET_LIBRARIES, (await ApiService.get(`libraries`)).data),
        [USER_LIBRARIES]: (context, payload) => context.commit(SET_USER_LIBRARIES, payload),
        [GET_API_USER_LIBRARIES]: async (context, id) => context.commit(SET_USER_LIBRARIES, (await ApiService.get(`libraries/userid/${id}`)).data),
        [POST_API_LIBRARY]: async (context, payload) => {
            var response = (await ApiService.post(`libraries`, payload))
            context.commit(SET_POST_LIBRARY, response.data);
            return response.status;
        },
        [PUT_API_LIBRARY]: async (context, payload) => {
            var response = (await ApiService.put(`libraries/id/${payload._id}`, payload))
            context.commit(SET_PUT_LIBRARY, response.data);
            return response.status;
        },
        [DELETE_API_LIBRARY]: async (context, id) => {
            var response = (await ApiService.delete(`libraries/id/${id}`))
            context.commit(SET_DELETE_LIBRARY, response.data);
            return response.status;
        }
    },
    mutations: {
        [SET_LIBRARY]: (state, payload) => state.library = payload,
        [SET_LIBRARIES]: (state, payload) => state.libraries = payload,
        [SET_USER_LIBRARIES]: (state, payload) => state.user_libraries = payload,
        [SET_POST_LIBRARY]: (state, payload) => state.libraries ? state.libraries.push(payload) : state.user_libraries ? state.user_libraries.push(payload) : null,
        [SET_PUT_LIBRARY]: (state, payload) => {
            if (state.libraries) state.libraries[state.libraries.findIndex(x => x._id == payload._id)] = payload;
            else if (state.user_libraries) state.user_libraries[state.user_libraries.findIndex(x => x._id == payload._id)] = payload;
        },
        [SET_DELETE_LIBRARY]: (state, payload) => {
            if (state.libraries) state.libraries.splice(state.libraries.findIndex(x => x._id == payload), 1)
            else if (state.user_libraries) state.user_libraries.splice(state.user_libraries.findIndex(x => x._id == payload), 1)
        },
    }
};
