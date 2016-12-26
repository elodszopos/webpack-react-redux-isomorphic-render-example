/* eslint no-console: 0, no-param-reassign: 0 */
const path = require('path');
const fs = require('fs-extra');
const bunyan = require('bunyan');
const Stream = require('stream');
const moment = require('moment');
const { terminal } = require('print-error');
const levels = require('./log.levels');

function printError(error) {
  console.log(terminal(error));
}

const colours = {
  Trace: 'blue',
  Debug: 'cyan',
  Info: 'green',
  Warn: 'yellow',
  Error: 'red',
  Fatal: 'magenta',
  '...': 'grey',
};

const styles = {
  // styles
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],

  // grayscale
  white: [37, 39],
  grey: [90, 39],
  black: [90, 39],

  // colors
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39],
};

function colorizeStart(style) {
  return style ? `\x1B[${styles[style][0]}m` : '';
}

function colorizeEnd(style) {
  return style ? `\x1B[${styles[style][1]}m` : '';
}

function colorize(text, style) {
  return colorizeStart(style) + text + colorizeEnd(style);
}

function preamble(source, level, time, colour) {
  let preambly = `[${source}] ${time} `;

  if (level !== 'Generic') {
    preambly += `${level} `;
  }

  return colorize(preambly, colour);
}

function print(source, level, message, time) {
  time = moment(time).format('dddd, MMMM Do YYYY, hh:mm:ss');

  return console.log(preamble(source, level, time, colours[level.toString()] || colours['...']) + message);
}

module.exports = function create(name) {
  const consoleOutput = new Stream();

  consoleOutput.writable = true;

  // for console_output.write()
  const orgPrint = print;

  consoleOutput.write = (data) => {
    if (data.err) {
      return printError(data.err);
    }

    const print = (level, message, time) => orgPrint(data.name, level, message, time); // eslint-disable-line

    print(levels[data.level] || '...', data.msg, data.time);

    return null;
  };

  const devLog = {
    streams: [{
      type: 'raw',
      stream: consoleOutput,
    }],
    serializers: {
      error: bunyan.stdSerializers.err,
      request: bunyan.stdSerializers.req,
      response: bunyan.stdSerializers.res,
    },
  };

  const logPath = path.resolve(rootFolder, 'log', `${name}.txt`);

  fs.ensureDirSync(path.dirname(logPath));

  const prodLog = {
    streams: [{
      type: 'raw',
      stream: consoleOutput,
    }, {
      type: 'rotating-file',
      path: logPath,
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    }],
    serializers: {
      error: bunyan.stdSerializers.err,
      request: bunyan.stdSerializers.req,
      response: bunyan.stdSerializers.res,
    },
  };

  const logConfig = (__PRODUCTION__ || process.env.NODE_ENV === 'production') ? prodLog : devLog;

  return bunyan.createLogger(Object.assign({}, logConfig, { name }));
};
