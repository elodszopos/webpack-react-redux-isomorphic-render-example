// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird');

if (__DEVELOPMENT__) {
  require('bluebird').longStackTraces(); // eslint-disable-line global-require
}

require('./application');
