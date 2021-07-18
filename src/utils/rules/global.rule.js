export default {
    required: (value) => !!value || 'inputErrorMessage.required',
    min: (v, n) => v.length >= n || "inputErrorMessage.min",
    max: (v, n) => v.length <= n || 'inputErrorMessage.max',
    isEqual: (v1, v2) => v1 == v2 ? true : 'message.notequal',
    notEqual: (v1, v2) => v1 != v2 ? true : 'message.equal',
}