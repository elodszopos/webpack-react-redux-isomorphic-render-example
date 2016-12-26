const baseConfiguration = require('./webpack.config.server');
const applicationConfiguration = require('../code/common/configuration');

const configuration = { ...baseConfiguration };

// Network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${applicationConfiguration.development.webpack.development_server.host}:${applicationConfiguration.development.webpack.development_server.port}${configuration.output.publicPath}`; // eslint-disable-line

module.exports = configuration;
