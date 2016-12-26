require('babel-runtime/core-js/promise').default = require('bluebird');

const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

global.__PRODUCTION__ = args.production;
global.__DEVELOPMENT__ = args.development || process.env.NODE_ENV === 'development';

require('bluebird').promisifyAll(require('fs-extra'));
