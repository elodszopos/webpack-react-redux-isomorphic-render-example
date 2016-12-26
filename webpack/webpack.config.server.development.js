const baseConfiguration = require('./webpack.config.server');
const applicationConfiguration = require('./servers/common/configuration');

const configuration = Object.assign({}, baseConfiguration);
const devServerSettings = applicationConfiguration.development.webpack.development_server;

// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${devServerSettings.host}:${devServerSettings.port}${configuration.output.publicPath}`; // eslint-disable-line

module.exports = configuration;
