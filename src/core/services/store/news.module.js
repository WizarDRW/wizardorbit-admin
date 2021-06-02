import ApiService from "@/core/services/api.service";

// action types -> NEWS<GET>
export const NEWS = "news"
export const GET_API_NEWS = "getApiNews"
export const THE_NEWS = "theNews"
export const GET_API_THE_NEWS = "getApiTheNews"
export const USER_THE_NEWS = "userTheNews"
export const GET_API_USER_THE_NEWS = "getApiUserTheNews"
export const IMPRESSION_NEWS_UPDATE = "impressionNewsUpdate"
// action types -> NEWS<POST>
export const POST_API_NEWS = "postApiNews"
// action types -> NEWS<PUT>
export const PUT_API_NEWS = "putApiNews"
// action types -> NEWS<DELETE>
export const DELETE_API_NEWS = "deleteApiNews"

// mutation types -> NEWS<SET>
const SET_NEWS = "setNews"
const SET_THE_NEWS = "setTheNews"
const SET_USER_THE_NEWS = "setUserTheNews"
const SET_POST_NEWS = "setPostNews"
const SET_PUT_NEWS = "setPutNews"
const SET_DELETE_NEWS = "setDeleteNews"

export default {
    state: {
        news: null,
        the_news: null,
        user_the_news: null
    },
    getters: {
        getNews: (state) => state.news,
        getTheNews: (state) => state.the_news,
        getUserTheNews: (state) => state.user_the_news
    },
    actions: {
        [NEWS]: (context, payload) => context.commit(SET_NEWS, payload),
        [GET_API_NEWS]: async (context, id) => context.commit(SET_NEWS, (await ApiService.get(`news/id/${id}`)).data),
        [THE_NEWS]: (context, payload) => context.commit(SET_THE_NEWS, payload),
        [GET_API_THE_NEWS]: async (context) => context.commit(SET_THE_NEWS, (await ApiService.get(`news/`)).data),
        [USER_THE_NEWS]: (context, payload) => context.commit(SET_USER_THE_NEWS, payload),
        [GET_API_USER_THE_NEWS]: async (context, id) => context.commit(SET_USER_THE_NEWS, (await ApiService.get(`news/userid/${id}`)).data),
        [IMPRESSION_NEWS_UPDATE]: async (context, data) => {
            ApiService.put("/blogs/updateImpression/id/" + data.id, {
                ip_address: data.ip,
                blog_id: data.id,
            });
        },
        [POST_API_NEWS]: async (context, payload) => {
            var response = (await ApiService.post(`news/`, payload))
            context.commit(SET_POST_NEWS, response.data)
            return response.status;
        },
        [PUT_API_NEWS]: async (context, payload) => {
            var response = (await ApiService.put(`news/id/${payload._id}`, payload))
            context.commit(SET_PUT_NEWS, response.data)
            return response.status;
        },
        [DELETE_API_NEWS]: async (context, id) => {
            var response = (await ApiService.delete(`news/id/${id}`))
            context.commit(SET_DELETE_NEWS, response.data)
            return response.status;
        },
    },
    mutations: {
        [SET_NEWS](state, payload) { state.news = payload },
        [SET_THE_NEWS]: (state, payload) => state.the_news = payload,
        [SET_USER_THE_NEWS](state, payload) { state.user_the_news = payload },
        [SET_POST_NEWS]: (state, payload) => {
            if (state.the_news) state.the_news.push(payload)
            if (state.user_the_news) state.user_the_news.push(payload)
        },
        [SET_PUT_NEWS]: (state, payload) => {
            if (state.the_news) state.the_news[state.the_news.findIndex(x => x._id == payload._id)] = payload
            if (state.user_the_news) state.user_the_news[state.user_the_news.findIndex(x => x._id == payload._id)] = payload
        },
        [SET_DELETE_NEWS]: (state, payload) => {
            if (state.the_news) state.the_news.splice(state.the_news.findIndex(x => x._id == payload), 1)
            if (state.user_the_news) state.user_the_news.splice(state.user_the_news.findIndex(x => x._id == payload), 1)
        }
    }
}