const Express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const configuration = require('./webpack.config.client.development');
const appConfig = require('./servers/common/configuration');

const options = {
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: configuration.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const compiler = webpack(configuration);

const devServer = new Express();

devServer.use(devMiddleware(compiler, options));
devServer.use(hotMiddleware(compiler));

devServer.listen(appConfig.development.webpack.development_server.port, (error) => {
  if (error) {
    console.error(error.stack || error); // eslint-disable-line no-console
    throw error;
  }

  console.log('[webpack-dev-server] Running'); // eslint-disable-line no-console
});
