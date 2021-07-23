export const ADD = "add";
export const UPDATE = "update";
export const DELETE = "delete";

export const OUT_QUEUE = "outQueue";

const DESTROY_QUEUE = "setOutQueue";
const SET_QUEUE = "setAllQueue";

export default {
    state: {
        all_queue: []
    },
    getters: {
        getAllQueue: (state) => state.all_queue
    },
    actions: {
        [ADD]: (context, payload) => {
            var data = {
                id: 1,
                type: 'add',
                ...payload
            }
            context.commit(SET_QUEUE, data);
        },
        [UPDATE]: (context, payload) => {
            var data = {
                id: 1,
                type: 'update',
                ...payload
            }
            context.commit(SET_QUEUE, data);
        },
        [DELETE]: (context, payload) => {
            var data = {
                id: 1,
                type: 'delete',
                ...payload
            }
            context.commit(SET_QUEUE, data);
        },
        [OUT_QUEUE]: (context, payload) => {
            context.commit(DESTROY_QUEUE, payload)
        },
    },
    mutations: {
        [SET_QUEUE]: (state, payload) => {
            payload.id = state.all_queue.length > 0 ? state.all_queue[state.all_queue.length - 1].id + 1 : 1;
            state.all_queue.push(payload);
        },
        [DESTROY_QUEUE]: (state, payload) => {
            state.all_queue.splice(state.all_queue.findIndex(x => x.id == payload), 1);
        }
    }
}