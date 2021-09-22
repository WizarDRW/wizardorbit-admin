import ApiService from "@/core/services/api.service"

//#region  action CHAPTER
// action types -> CHAPTER<GET> 
export const CHAPTER = "chapter";
export const GET_API_CHAPTER = "getApiChapter"
export const CHAPTERS = "chapters";
export const GET_API_CHAPTERS = "getApiChapters"
export const USER_CHAPTERS = "userChapter"
export const GET_API_USER_CHAPTERS = "getApiUserChapters"
// action types -> CHAPTER<POST>
export const POST_API_CHAPTER = "postApiChapter"
// action types -> CHAPTER<PUT>
export const PUT_API_CHAPTER = "putApiChapter"
// action types -> CHAPTER<DELETE>
export const DELETE_API_CHAPTER = "deleteApiChapter"
//#endregion

//#region mutation CHAPTER
// mutation types -> CHAPTER<GET>
const SET_CHAPTER = "setChapter";
const SET_CHAPTERS = "setChapters";
const SET_USER_CHAPTERS = "setUserChapters";
// mutation types -> CHAPTER<POST>
const SET_POST_CHAPTER = "setPostChapter";
// mutation types -> CHAPTER<PUT>
const SET_PUT_CHAPTER = "setPutChapter";
// mutation types -> CHAPTER<DELETE>
const SET_DELETE_CHAPTER = "setDeleteChapter";
//#endregion

export default {
  state: {
    chapter: null,
    chapters: null,
    user_chapters: null
  },
  getters: {
    // CHAPTER
    getChapter: (state) => state.chapter,
    getChapters: (state) => state.chapters,
    getUserChapters: (state) => state.user_chapters,
  },
  actions: {
    //#region  GET  ->  CHAPTER
    [CHAPTER]: (context, payload) => context.commit(SET_CHAPTER, payload),
    [GET_API_CHAPTER]: async (context, id) => context.commit(SET_CHAPTER, (await ApiService.get(`chapters/id/${id}`)).data),
    [CHAPTERS]: (context, payload) => context.commit(SET_CHAPTERS, payload),
    [GET_API_CHAPTERS]: async (context) => context.commit(SET_CHAPTERS, (await ApiService.get(`chapters/`)).data),
    [USER_CHAPTERS]: (context, payload) => context.commit(SET_USER_CHAPTERS, payload),
    [GET_API_USER_CHAPTERS]: async (context, id) => context.commit(SET_USER_CHAPTERS, (await ApiService.get(`chapters/userid/${id}`)).data),
    //#endregion
    //#region POST ->  CHAPTER
    [POST_API_CHAPTER]: async (context, data) => {
      var result = (await ApiService.post(`chapters/`, data))
      context.commit(SET_POST_CHAPTER, result.data)
      return result.status;
    },
    //#endregion
    //#region PUT  ->  CHAPTER
    [PUT_API_CHAPTER]: async (context, data) => {
      var result = (await ApiService.put(`chapters/id/${data._id}`, data))
      if (result.status == 200) {
        context.commit(SET_PUT_CHAPTER, result.data)
      }
      return result.status;
    },
    //#endregion
    //#region DELETE  ->  CHAPTER
    [DELETE_API_CHAPTER]: async (context, id) => {
      var result = (await ApiService.delete(`chapters/id/${id}`))
      context.commit(SET_DELETE_CHAPTER, result.data)
      return result.status;
    },
    //#endregion
  },
  mutations: {
    // CHAPTER
    [SET_CHAPTER]: (state, payload) => state.chapter = payload,
    [SET_CHAPTERS]: (state, payload) => state.chapters = [...payload],
    [SET_USER_CHAPTERS]: (state, payload) => state.user_chapters = [...payload],
    [SET_POST_CHAPTER]: (state, payload) => state.chapters ? state.chapters.push(payload) : state.user_chapters ? state.user_chapters.push(payload) : null,
    [SET_PUT_CHAPTER]: (state, payload) => {
      if (state.chapters) {
        state.chapters[state.chapters.indexOf(x => x._id == payload._id)] = payload
      }
      if (state.user_chapters) {
        state.user_chapters[state.user_chapters.indexOf(x => x._id == payload._id)] = payload
      }
    },
    [SET_DELETE_CHAPTER]: (state, payload) => {
      console.log(payload);
      if (state.chapters) state.chapters.splice(state.chapters.findIndex(x => x._id == payload), 1)
      if (state.user_chapters) state.user_chapters.splice(state.user_chapters.findIndex(x => x._id == payload), 1)
    }
  }
};
