const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [
         {
         test:/\.(s*)css$/,
         use: [
            miniCss.loader,
            'css-loader',
            'sass-loader',
         ]
      },
      {
         test: /\.js$/,
         exclude: /node_modules/,
         use: ['babel-loader'],
      },
      {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: 'asset/resource',
         },
      ]
   },
   plugins: [
      new miniCss({
         filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
         title: 'webpack base',
         template: path.resolve(__dirname, './src/template.html'), // шаблон
         filename: 'index.html', // название выходного файла
     }),
     new CleanWebpackPlugin(),
   ]
};