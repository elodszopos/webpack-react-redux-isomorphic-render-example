require('source-map-support/register');

const universalWebpack = require('universal-webpack');
const settings = require('../../webpack/universal-webpack-settings');
const configuration = require('../../webpack/webpack.config');

universalWebpack.server(configuration, settings);
