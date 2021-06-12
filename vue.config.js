module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "https://sihirbaz.herokuapp.com"
    },
    proxy: {
      '/service': {
        target: 'https://sihirbaz.herokuapp.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/service': ''
        }
      },
      '/login': {
        target: 'https://sihirbaz.herokuapp.com/api/v1/auth/login',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/login': ''
        }
      }
    }
  }
}
