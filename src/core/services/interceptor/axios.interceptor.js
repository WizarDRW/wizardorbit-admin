const deleteTokenSource = new Map();

export default (app) => {
    app.interceptors.request.use(
        async config => {
            return await new Promise((resolve) => {
                resolve(config)
            })
        }
    )
    app.interceptors.response.use(
        (response) => {
            if (response.config.cancelToken)
                deleteTokenSource.delete(response.config.cancelToken)
            return Promise.resolve(response)
        }, err => {
            console.log(err);
        }
    )
}