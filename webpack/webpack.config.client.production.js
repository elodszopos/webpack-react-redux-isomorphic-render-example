const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.client');

const configuration = baseConfig({ development: false });

configuration.devtool = 'cheap-module-source-map';

configuration.plugins = configuration.plugins.concat([
  new CleanPlugin([path.relative(configuration.context, configuration.output.path)], { root: configuration.context }),
  new webpack.DefinePlugin({
    __DEVELOPMENT__: false,
    __PRODUCTION__: true,
    __DEVTOOLS__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  // new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
]);

module.exports = configuration;
