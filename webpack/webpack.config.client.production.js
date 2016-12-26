const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.client');

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// (this behaviour can be disabled with `css_bundle: false`)
// (the filename can be customized with `css_bundle: "filename.css"`)
const configuration = baseConfig({ development: false });

configuration.devtool = 'source-map';

configuration.plugins = configuration.plugins.concat([
  // clears the output folder
  new CleanPlugin([path.relative(configuration.context, configuration.output.path)], { root: configuration.context }),

  // environment variables
  new webpack.DefinePlugin({
    'process.env': {
      // Useful to reduce the size of client-side libraries, e.g. react
      NODE_ENV: JSON.stringify('production'), // 'development' to see non-minified React errors
    },

    __DEVELOPMENT__: false,
    __PRODUCTION__: true,
    __DEVTOOLS__: false,  // enable/disable redux-devtools
  }),

  // // extracts common javascript into a separate file (works)
  // new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js'),

  // Compresses javascript files
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),

  // For production mode
  // https://moduscreate.com/webpack-2-tree-shaking-configuration/
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
]);

module.exports = configuration;
