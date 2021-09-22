import ApiService from "@/core/services/api.service"
export const POST_API_MULTIPART = "postApiMultipart";

export const DELETE_API_MULTIPART = "deleteApiMultipart"

export default {
    state: {

    },
    getters: {

    },
    actions: {
        [POST_API_MULTIPART]: async (context, payload) => {
            var result = (await ApiService.postMultipart(`multiparts/upload/`, payload))
            return result.data;
        },
        [DELETE_API_MULTIPART]: async (context, url) => {
            var result = (await ApiService.post(`multiparts/delete-image`, { url: url }))
            return result.data;
        },
    },
    mutations: {

    }
}