const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: "bundle.js"
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss|css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(ttf)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}