import ApiService from "@/core/services/api.service"

// action get
export const CATEGORY = "category"
export const GET_API_CATEGORY = "getApiCategory"
export const CATEGORIES = "categories"
export const GET_API_CATEGORIES = "getApiCategories"
export const SELECT_CATEGORIES = "selectCategories"
// action types -> CHAPTER CATEGORIES<POST>
export const POST_API_CATEGORY = "postApiCategory"
// action types -> CHAPTER CATEGORIES<PUT>
export const PUT_API_CATEGORY = "putApiCategory"
// action types -> CHAPTER CATEGORIES<DELETE>
export const DELETE_API_CATEGORY = "deleteApiCategory"

// mutations
const SET_CATEGORY = "setCategory"
const SET_CATEGORIES = "setCategories"
const SET_SELECT_CATEGORIES = "setSelectCategories"
const SET_POST_CATEGORY = "setPostCategory";
const SET_PUT_CATEGORY = "setPutCategory";
const SET_DELETE_CATEGORY = "setDeleteCategory";

export default {
    state: {
        category: null,
        categories: null,
        select_categories: null
    },
    getters: {
        getCategory: (state) => state.category,
        getCategories: (state) => state.categories,
        getSelectCategories: (state) => state.select_categories
    },
    actions: {
        [CATEGORY]: (context, payload) => context.commit(SET_CATEGORY, payload),
        [GET_API_CATEGORY]: async (context, payload) => context.commit(SET_CATEGORY, (await ApiService.get(`categories/type/${payload}`)).data),
        [CATEGORIES]: (context, payload) => context.commit(SET_CATEGORIES, payload),
        [GET_API_CATEGORIES]: async (context, payload) => context.commit(SET_CATEGORIES, (await ApiService.get(`categories/type/${payload}`)).data),
        [SELECT_CATEGORIES]: async (context, datas) => context.commit(SET_SELECT_CATEGORIES, datas),
        //#region POST ->  CATEGORY
        [POST_API_CATEGORY]: async (context, payload) => {
            var result = (await ApiService.post(`categories`, payload))
            context.commit(SET_POST_CATEGORY, result.data)
            return result.status;
        },
        //#endregion
        //#region PUT  ->  CATEGORY
        [PUT_API_CATEGORY]: async (context, payload) => {
            var result = (await ApiService.put(`categories/id/${payload._id}`, payload))
            context.commit(SET_PUT_CATEGORY, result.data)
            return result.status;
        },
        //#endregion
        //#region DELETE  ->  CATEGORY
        [DELETE_API_CATEGORY]: async (context, payload) => {
            var result = (await ApiService.delete(`categories/id/${payload._id}`))
            context.commit(SET_DELETE_CATEGORY, result.data)
            return result.status;
        },
        //#endregion

    },
    mutations: {
        [SET_CATEGORY]: (state, payload) => state.category = payload,
        [SET_CATEGORIES]: (state, payload) => state.categories = payload,
        [SET_SELECT_CATEGORIES]: (state, payload) => state.select_categories = payload,
        [SET_POST_CATEGORY]: (state, payload) => {
            console.log(payload);
            state.categories = payload
        },
        [SET_PUT_CATEGORY]: (state, payload) => {
            state.categories = payload
        },
        [SET_DELETE_CATEGORY]: (state, payload) => {
            state.categories = payload
        },
    }
}