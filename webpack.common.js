const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const basePath = __dirname;

module.exports = {
  mode: 'development',
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  entry: {
    app: './index.tsx',
    appStyles: ['./mystyles.scss'],
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      scriptLoading: 'blocking',
    }),
    new CleanWebpackPlugin(),
  ],
};
