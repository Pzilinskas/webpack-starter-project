const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');


module.exports = {
 mode: 'production',
 entry: {
  app: './src/index.js',
 },
 optimization: {
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,

    }),
   new OptimizeCSSAssetsPlugin({})
  ]
 },
 module: {
  rules: [{
    test: /\.handlebars$/,
    loader: "handlebars-loader"
   },
   {
    test: /\.(sa|sc|c)ss$/,
    use: [
     MiniCssExtractPlugin.loader,
     {
      loader: "css-loader",
      options: {}
     },
     {
      loader: "postcss-loader",
      options: {
       ident: 'postcss',
       plugins: [
        require('autoprefixer')({
         'browsers': ['> 1%', 'last 2 versions']
        }),
       ]
      }
     },
     {
      loader: "sass-loader",
      options: {}
     }
    ]
   },
   {
    test: /\.(jpg|png|gif)$/,
    use: [{
      loader: "file-loader",
      options: {
       name: '[name].[ext]',
       outputPath: 'static/',
       useRelativePath: true,
      }
     },
     {
      loader: 'image-webpack-loader',
      options: {
       mozjpeg: {
        progressive: true,
        quality: 65
       },
       optipng: {
        enabled: true,
       },
       pngquant: {
        quality: '65-90',
        speed: 4
       },
       gifsicle: {
        interlaced: false,
       },
       webp: {
        quality: 75
       }
      }
     }
    ]
   }
  ]
 },
 plugins: [
  new MiniCssExtractPlugin({
   filename: "[name].css",
   chunkFilename: "[id].css"
  }),
  new webpack.LoaderOptionsPlugin({
   options: {
    handlebarsLoader: {}
   }
  }),
  new CleanWebpackPlugin(['dist']),
  new CompressionPlugin({
    filename: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new HtmlWebpackPlugin({
   template: './src/index.handlebars',
   minify: {
    html5: true,
    collapseWhitespace: true,
    caseSensitive: true,
    removeComments: true,
    removeEmptyElements: true
   },
  })
 ]
};