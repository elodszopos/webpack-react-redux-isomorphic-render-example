const universalWebpack = require('universal-webpack');
const configuration = require('./webpack.config');
const universalWebpackConfig = require('./common').universalWebpackConfig;

module.exports = options => universalWebpack.client_configuration(configuration, universalWebpackConfig, options);
