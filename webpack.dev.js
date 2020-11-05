const { merge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './bundle',
    inline: true,
    port: 3000,
    proxy: {
      '/api/**': {
        target: process.env.API_ENV,
        secure: false,
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
});
