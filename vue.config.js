const zlib = require("zlib")
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    compression: {
      brotli: {
        filename: '[file].br[query]',
        algorithm: 'brotliCompress',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    }
  },
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
