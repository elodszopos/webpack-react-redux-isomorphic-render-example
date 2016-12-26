// this .entry.js file simply enables ES6 language features

require('babel-register');

module.exports = require('./webpack.config.server.development');
