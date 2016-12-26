require('../../webpack/servers/common/server.entry');
require('source-map-support/register');

const universalWebpack = require('universal-webpack');
const settings = require('../../webpack/common').universalWebpackConfig;
const configuration = require('../../webpack/webpack.config');

universalWebpack.server(configuration, settings);
