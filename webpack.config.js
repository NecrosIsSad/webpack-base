const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

const PATH_SRC_ASSETS = path.join(__dirname, './src/assets/')


module.exports = {
   entry: {
      app: [
         "./src/app.js",
         "./src/app.scss"
      ]
  },
   output: {
      filename: '[name].[contenthash].js',
      path: path.join(__dirname, './build'),
      publicPath: "/"
   },
   module: {
      rules: [
         {
            test: /\.scss$/,
            use: [
               "style-loader",
               MiniCssExtractPlugin.loader,
               {
                  loader: "css-loader",
                  options: {
                     sourceMap: true,
                  }
               },
               {
                  loader: "sass-loader",
                  options: {
                     sourceMap: true
                  }
               },
               {
               loader: "postcss-loader",
               options: {
                     config: {
                        path: `./postcss.config.js`
                     }
                  }
               }
            ]
        },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
         },
         {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file-loader',
            options: {
               name: '[path][name].[ext]',
            }
         },
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
      new HtmlWebpackPlugin({
         title: 'webpack-base',
         template: path.resolve(__dirname, './src/template.html'), 
         filename: 'index.html',
     }),
     new CleanWebpackPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     new copyWebpackPlugin( 
        { 
        patterns: [
            {
               from: `${PATH_SRC_ASSETS}/images`,
               to: `/images`
            },
            {
               from: `${PATH_SRC_ASSETS}/fonts`,
               to: `/fonts`
            },
        ]
      }),
      new MiniCssExtractPlugin({
         filename: `[name].[contenthash].css`
     })
   ]
};