require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const root = path.resolve(__dirname);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(root, 'src/client/index.js'),
  output: {
    filename: 'assets/main.[hash:6].js',
    path: path.join(root, 'public'),
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(root, 'src/client/index.html')
    })
  ],
  devServer: {
    port: process.env.PORT || 3000,
    client: {
      logging: 'info'
    },
    proxy: [{
      context: ['/api'],
      target: `http://localhost:${process.env.PORT_API || 3001}`
    }]
  }
};
