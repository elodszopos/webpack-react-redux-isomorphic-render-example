const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const root = path.resolve(__dirname, '..');
const assetPath = path.resolve(root, 'build/assets');

const configuration = {
  context: root,
  entry: {
    main: './code/client/application.entry.js',
  },
  output: {
    path: assetPath,
    publicPath: '/assets/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&sourceMap',
          'postcss-loader',
          'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
        ],
      }, {
        test: /\.(jpg|png)$/,
        loaders: [
          'url-loader?limit=10000',
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        context: root,
        postcss: [autoprefixer({ browsers: 'last 2 version' })],
        output: {
          path: assetPath,
        },
      },
    }),
  ],
};

module.exports = configuration;
