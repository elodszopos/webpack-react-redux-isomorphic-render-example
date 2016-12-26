require('babel-runtime/core-js/promise').default = require('bluebird');

const minimist = require('minimist');
const path = require('path');

global.rootFolder = path.resolve(__dirname, '..', '..');

const args = minimist(process.argv.slice(2));

global.__PRODUCTION__ = args.production;
global.__DEVELOPMENT__ = args.development || process.env.NODE_ENV === 'development';

require('babel-register')({
  ignore(filename)	{
    const relativePath = path.relative(global.rootFolder, filename);
    let folder = path.dirname(relativePath);

    if (folder.split(path.sep).indexOf('node_modules') >= 0)		{
      return true;
    }

    const slashIndex = folder.indexOf(path.sep);

    if (slashIndex >= 0)		{
      folder = folder.substring(0, slashIndex);
    }

    return folder === 'build';
  },
});

require('bluebird').promisifyAll(require('fs-extra'));

global.configuration = require('./configuration');
