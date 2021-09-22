export const ADD = "add";
export const UPDATE = "update";
export const DELETE = "delete";
export const RESULT_QUEUE = "resultQueue";
export const OUT_QUEUE = "outQueue";

const DESTROY_QUEUE = "destroyOutQueue";
const DESTROY_RESULT_QUEUE = "destroyResultQueue";
const SET_QUEUE = "setAllQueue";
const SET_RESULT_QUEUE = "setResultQueue";

export default {
    state: {
        all_queues: [],
        result_queues: []
    },
    getters: {
        getAllQueues: (state) => state.all_queues,
        getResultQueues: (state) => state.result_queues
    },
    actions: {
        [ADD]: (context, payload) => {
            return new Promise((resolve) => {
                var data = {
                    id: 1,
                    type: 'add',
                    ...payload
                }
                context.commit(SET_QUEUE, { payload: data, callback: resolve });
            })
        },
        [UPDATE]: (context, payload) => {
            return new Promise((resolve) => {
                var data = {
                    id: 1,
                    type: 'update',
                    ...payload
                }
                context.commit(SET_QUEUE, { payload: data, callback: resolve });
            })
        },
        [DELETE]: (context, payload) => {
            return new Promise((resolve) => {
                var data = {
                    id: 1,
                    type: 'delete',
                    ...payload
                }
                context.commit(SET_QUEUE, { payload: data, callback: resolve });
            })
        },
        [RESULT_QUEUE]: (context, payload) => {
            return new Promise((resolve) => {
                context.commit(SET_RESULT_QUEUE, { payload: payload, callback: resolve });
            })
        },
        [OUT_QUEUE]: (context, payload) => {
            context.commit(DESTROY_QUEUE, payload)
        },
    },
    mutations: {
        [SET_QUEUE]: (state, { payload, callback }) => {
            payload.id = state.all_queues.length > 0 ? state.all_queues[state.all_queues.length - 1].id + 1 : 1;
            state.all_queues.push(payload);
            callback(payload.id);
        },
        [SET_RESULT_QUEUE]: (state, { payload, callback }) => {
            state.result_queues.push(payload)
            callback(payload.id)
        },
        [DESTROY_QUEUE]: (state, payload) => {
            state.all_queues.splice(state.all_queues.findIndex(x => x.id == payload), 1);
        },
        [DESTROY_RESULT_QUEUE]: (state, payload) => {
            state.result_queues.splice(state.result_queues.findIndex(x => x.id == payload), 1);
        }
    }
}