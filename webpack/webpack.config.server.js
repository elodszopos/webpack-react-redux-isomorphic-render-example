const universalWebpack = require('universal-webpack');
const configuration = require('./webpack.config');
const universalWebpackConfig = require('./common').universalWebpackConfig;

module.exports = universalWebpack.server_configuration(configuration, universalWebpackConfig);
