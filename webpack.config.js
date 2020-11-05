const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

require('dotenv').config();

module.exports = {
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './assets/images',
              outputPath: './assets/images',
              useRelativePath: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss', '.sass'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Конструктор форм',
      template: './index.html',
      inject: true,
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
};
