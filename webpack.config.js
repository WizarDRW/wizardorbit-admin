let webpack = require('webpack')
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    publicPath: './public'
  },
  module: {
    rules: [
      {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            indentedSyntax: true // optional
          },
          // Requires >= sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
    { test: /\.css$/, loader: 'css-loader' },
    { test: /\.vue$/, loader: 'vue-loader' },
    { test: /\.vue\.html$/, loader: 'vue-loader' },
    {
      test: /\.js$/,
      loader: 'babel-loader'
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg|gif|png|jpg|jpeg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
      '@': __dirname + '/src',
    },
    extensions: ["*", ".js", ".vue", ".json", ".css"],
  },
  watch: true
}