const webpack = require('webpack');
const baseConfig = require('./webpack.config.client');
const appConfig = require('./servers/common/configuration');

const configuration = baseConfig({
  development: true,
  css_bundle: true,
});

configuration.devtool = 'inline-eval-cheap-source-map';

configuration.plugins.push(new webpack.DefinePlugin({
  __PRODUCTION__: false,
  __DEVELOPMENT__: true,
  __DEVTOOLS__: false,
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
    BABEL_ENV: JSON.stringify('development/client'),
  },
}));

configuration.plugins.push(new webpack.HotModuleReplacementPlugin());

// new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js')

const devServerConfig = appConfig.development.webpack.development_server;

// enable webpack development server
configuration.entry.main = [
  `webpack-hot-middleware/client?path=http://${devServerConfig.host}:${devServerConfig.port}/__webpack_hmr`, // eslint-disable-line
  configuration.entry.main,
];

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${devServerConfig.host}:${devServerConfig.port}${configuration.output.publicPath}`;  // eslint-disable-line

// Add React Hot Module Replacement plugin to `babel-loader`

const jsLoader = configuration.module.loaders.filter(loader => loader.test.toString() === (/\.js$/).toString())[0];

jsLoader.query = jsLoader.query || {};

jsLoader.query.plugins = jsLoader.query.plugins || [];

jsLoader.query.plugins = jsLoader.query.plugins.concat([[
  'react-transform',
  {
    transforms: [
      {
        transform: 'react-transform-catch-errors',
        imports: ['react', 'redbox-react'],
      },
      {
        transform: 'react-transform-hmr',
        imports: ['react'],
        locals: ['module'],
      },
    ],
  },
]]);

module.exports = configuration;
