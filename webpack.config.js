const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');

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
         {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: 'asset/inline',
         }
      ]
   },
   mode: 'development',
   devServer: {
       historyApiFallback: true,
       contentBase: path.resolve(__dirname, './dist'),
       open: true,
       compress: true,
       hot: true,
       port: 8080,
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
     new webpack.HotModuleReplacementPlugin(),
   ]
};