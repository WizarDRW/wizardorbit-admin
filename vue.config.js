module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    proxy: {
      '/service': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/service': ''
        }
      },
      '/login': {
        target: 'http://localhost:3000/api/v1/auth/login',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/login': ''
        }
      }
    }
  }
}
