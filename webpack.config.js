const path = require('path');
const HTMLWebpackPlugin =  require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin =  require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const {CleanWebpackPlugin} =  require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve:{
      extensions: ['.js'],
      alias: {
        "@utils": path.resolve(__dirname, 'src/utils/'),
        "@templates": path.resolve(__dirname, 'src/templates/'),
        "@styles": path.resolve(__dirname, 'src/styles/'),
        "@images": path.resolve(__dirname, 'src/assets/images/'),
      }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
              test: /\.css|\.styl$/i,
              use: [
                MiniCSSExtractPlugin.loader,
                'css-loader',
                'stylus-loader',
              ],
            },
            {
              test:/\.png/,
              type:'asset/resource'
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: "asset/resource",
              generator: {
                filename: "assets/fonts/[hash][ext]",
                },
  

            }
        ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCSSExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"

        }
      ]
    }),
    new DotEnv(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      new CleanWebpackPlugin(),
    ]
  },
};

  