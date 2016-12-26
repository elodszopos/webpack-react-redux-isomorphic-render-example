const webpack = require('webpack');
const baseConfig = require('./webpack.config.client');
const appConfig = require('../code/common/configuration');

const configuration = baseConfig({
  development: true,
  css_bundle: true,
});

configuration.devtool = 'inline-eval-cheap-source-map';

configuration.plugins.push(
  // environment variables
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BABEL_ENV: JSON.stringify('development/client'),
    },

    __PRODUCTION__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: false,  // enable/disable redux-devtools
  }),

  // faster code reload on changes
  new webpack.HotModuleReplacementPlugin(),

  // // extracts common javascript into a separate file (works)
  // new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js')
);

// enable webpack development server
configuration.entry.main = [
  `webpack-hot-middleware/client?path=http://${appConfig.development.webpack.development_server.host}:${appConfig.development.webpack.development_server.port}/__webpack_hmr`, // eslint-disable-line
  configuration.entry.main,
];

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${appConfig.development.webpack.development_server.host}:${appConfig.development.webpack.development_server.port}${configuration.output.publicPath}`;  // eslint-disable-line

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
