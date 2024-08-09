require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const root = path.resolve(__dirname);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(root, 'src/client/index.js'),
  output: {
    filename: 'assets/main.[contenthash:6].js',
    path: path.join(root, 'public'),
    publicPath: '/',
    clean: true
  },
  devServer: {
    port: process.env.PORT || 3000,
    client: {
      logging: 'verbose',
      overlay: true
    },
    proxy: [{
      context: ['/api', '/auth'],
      target: `http://localhost:${process.env.PORT_API || 3001}`
    }],
    historyApiFallback: true
  },
  watchOptions: {
    poll: 1000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(root, 'src/client/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(root, 'src/client/components'),
      state: path.join(root, 'src/client/state'),
      services: path.join(root, 'src/client/services')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/i,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: 'defaults'
              }],
              '@babel/preset-react'
            ]
          }
        }]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]

  }
};
