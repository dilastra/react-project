const {merge} = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api/**': {
        target: 'http://ves.impeltech.ru',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  devtool: 'inline-source-map',
});
