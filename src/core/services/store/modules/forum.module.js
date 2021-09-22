import ApiService from "@/core/services/api.service";

// action types -> FORUM<GET>
export const FORUM = "forum";
export const GET_API_FORUM = "getApiForum";
export const FORUMS = "forums";
export const GET_API_FORUMS = "getApiForums";
export const USER_FORUMS = "userForums";
export const GET_API_USER_FORUMS = "getApiUserForums";
// action types -> FORUM<POST>
export const FORUM_SENT_COMMENT = "forumSentComment";
export const POST_API_FORUM = "postApiForum";
// action types -> FORUM<PUT>
export const PUT_API_FORUM = "putApiForum";
// action types -> FORUM<DELETE>
export const DELETE_API_FORUM = "deleteApiForum";

// mutation types
const SET_FORUM = "setForum"
const SET_FORUMS = "setForums"
const SET_USER_FORUMS = "setUserForums"
const SET_POST_FORUM = "setPostForum"
const SET_PUT_FORUM = "setPutForum"
const SET_DELETE_FORUM = "setDeleteForum"

export default {
  state: {
    forum: null,
    forums: null,
    user_forums: null,
    forum_categories: null
  },
  getters: {
    getForum: (state) => state.forum,
    getForums: (state) => state.forums,
    getUserForums: (state) => state.user_forums,
  },
  actions: {
    [FORUM]: (context, payload) => context.commit(SET_FORUM, payload),
    [GET_API_FORUM]: async (context, id) => context.commit(SET_FORUM, (await ApiService.get(`forums/id/${id}`)).data),
    [FORUMS]: (context, payload) => context.commit(SET_FORUMS, payload),
    [GET_API_FORUMS]: async (context) => context.commit(SET_FORUMS, (await ApiService.get(`forums/`)).data),
    [USER_FORUMS]: (context, payload) => context.commit(SET_USER_FORUMS, payload),
    [GET_API_USER_FORUMS]: async (context, id) => context.commit(SET_USER_FORUMS, (await ApiService.get(`forums/userid/${id}`)).data),
    [FORUM_SENT_COMMENT]: async (context, { id, comment }) => (await ApiService.post(`forums/comment/${id}`, comment)),
    [POST_API_FORUM]: async (context, payload) => {
      var result = (await ApiService.post(`forums/`, payload))
      context.commit(SET_POST_FORUM, result.data)
      return result.status;
    },    
    [PUT_API_FORUM]: async (context, payload) => {
      var result = (await ApiService.put(`forums/id/${payload._id}`, payload))
      context.commit(SET_PUT_FORUM, result.data)
      return result.status;
    },    
    [DELETE_API_FORUM]: async (context, id) => {
      var result = (await ApiService.delete(`forums/id/${id}`))
      context.commit(SET_DELETE_FORUM, result.data)
      return result.status;
    },
  },
  mutations: {
    [SET_FORUM]: (state, payload) => state.forum = payload,
    [SET_FORUMS]: (state, payload) => state.forums = payload,
    [SET_USER_FORUMS]: (state, payload) => state.user_forums = payload,
    [SET_POST_FORUM]: (state, payload) => {
      if (state.forums) state.forums.push(payload)
      if (state.user_forums) state.user_forums.push(payload)
    },    
    [SET_PUT_FORUM]: (state, payload) => {
      if (state.forums) state.forums[state.forums.findIndex(x=>x._id == payload._id)] = payload
      if (state.user_forums) state.user_forums[state.user_forums.findIndex(x=>x._id == payload._id)] = payload
    },    
    [SET_DELETE_FORUM]: (state, payload) => {
      if (state.forums) state.forums.splice(state.forums.findIndex(x=>x._id == payload), 1)
      if (state.user_forums) state.user_forums.splice(state.user_forums.findIndex(x=>x._id == payload), 1)
    },
  }
};
