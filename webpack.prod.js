const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'production',
  stats: 'verbose',
  output: {
    filename: 'js/[name].[chunkhash].js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: (module) => {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor/${packageName.replace('@', '')}`;
          },
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
    new Dotenv({
      path: './prod.env',
    }),
  ],
});
