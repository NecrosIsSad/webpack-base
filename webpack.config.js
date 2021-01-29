const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

const PATH_SRC = path.join(__dirname, './src')
const PATH_BUILD = path.join(__dirname, './build')
const PATH_ASSETS = 'assets/'

module.exports = {
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
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
                        sourceMap: true
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
              },
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
      new HtmlWebpackPlugin({
         title: 'webpack base',
         template: path.resolve(__dirname, './src/template.html'), // шаблон
         filename: 'index.html', // название выходного файла
     }),
     new CleanWebpackPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     new copyWebpackPlugin( 
        { 
        patterns: [
            {
               from: `${PATH_SRC}/${PATH_ASSETS}/images`,
               to: `images`
            },
            {
               from: `${PATH_SRC}/${PATH_ASSETS}/fonts`,
               to: `fonts`
            },
        ]
      }),
      new MiniCssExtractPlugin({
         filename: `css/[name].[contenthash].css`
     })
   ]
};