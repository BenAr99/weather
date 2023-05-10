const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
  },
  externalsType: 'script',
  externals: {
    ymaps3: [
      'https://api-maps.yandex.ru/3.0/?apikey=30999c95-a148-44fd-b9ce-5c3671211e85&lang=ru-RU',
      'ymaps3',
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //     patterns: [
    //         { from: 'assets/image', to: 'assets/image' },
    //         { from: 'assets/icons', to: 'assets/icons' }
    //     ]
    // })
  ],
  devServer: {
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
};
