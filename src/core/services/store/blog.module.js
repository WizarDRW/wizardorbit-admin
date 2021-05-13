import ApiService from "@/core/services/api.service"
// action types
export const BLOG = "blog";
export const GET_API_BLOG = "getApiBlog"

// mutation types
export const SET_BLOG = "setBlog";

export default {
  state: {
    blog: null,
  },
  getters: {
    getBlog(state) {
      return state.blog;
    }
  },
  actions: {
    [BLOG](state, payload) {
      state.commit(SET_BLOG, payload);
    },
    async [GET_API_BLOG](state, id) {
      var data = (await ApiService.get(`blogs/id/${id}`)).data
      state.commit(SET_BLOG, data);
    },
  },
  mutations: {
    [SET_BLOG](state, payload) {
      state.blog = payload;
    },
  }
};
