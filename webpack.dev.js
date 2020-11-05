const { merge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './bundle',
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api/**': {
        target: 'http://backend-node:5000',
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
