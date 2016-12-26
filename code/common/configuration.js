const minimist = require('minimist');

const configuration = require('../../configuration.defaults');
const specificConfig = require('../../configuration');

const extendedConfig = Object.assign({}, configuration, specificConfig);

module.exports = extendedConfig;

const args = minimist(process.argv.slice(2));

if (args.path) {
  console.log(Object.path(configuration, args.path)); // eslint-disable-line no-console
  process.exit();
}
