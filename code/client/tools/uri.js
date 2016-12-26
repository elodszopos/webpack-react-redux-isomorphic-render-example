// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
//
// takes a string
// returns an object { protocol, host, port, path, query, anchor, ... }
function parseUri(uri = document.location) {
  const options = {
    strictMode: false,
    key: [
      'source',   // protocol:
      'protocol',
      'authority', // //user:password@
      'userInfo', // user:password
      'user',
      'password',
      'host',
      'port',
      'relative',
      'path',
      'directory',
      'file',
      'query',
      'anchor',
    ],
    query: {
      name: 'parameters',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g,
    },
    parser: {
      //            protocol  :     //      user        :password    @  host          :port      path (relative,directory,file) ? query       #anchor
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, // eslint-disable-line
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, // eslint-disable-line
    },
  };

  const matches = options.parser[options.strictMode ? 'strict' : 'loose'].exec(uri);

  const result = {};

  let i = 14;

  while (i--) {
    result[options.key[i]] = matches[i] || '';
  }

  result[options.query.name] = {};

  // options.key[12] === "query"
  result[options.key[12]].replace(options.query.parser, ($0, $1, $2) => {
    if ($1) {
      result[options.query.name][$1] = $2;
    }
  });

  return result;
}

export default class Uri {
  constructor(uri) {
    const parsed = parseUri(uri);

    for (const key of Object.keys(parsed)) {
      this[key] = parsed[key];
    }

    // this.protocol = this.protocol || 'http'
    this.path = decodeURI(this.path);

    for (const key of Object.keys(this.parameters)) {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(this.parameters[key]);

      this.parameters[decodedKey] = decodedValue;

      if (decodedKey !== key) {
        delete this.parameters[key];
      }

      if (!this[key]) {
        this[key] = decodedValue;
      }
    }
  }

  toRelativeUrl() {
    this.protocol = '';
    this.host = '';
    this.port = '';

    return this.print();
  }

  noParameters() {
    this.parameters = {};

    return this;
  }

  parameter(parameter, value) {
    this.parameters[parameter] = value;

    return this;
  }

  removeParameter(parameter) {
    delete this.parameters[parameter];

    return this;
  }

  print(options = {}) {
    options = { ...options, machine: true }; // eslint-disable-line no-param-reassign

    let uri = '';

    if (this.protocol) {
      let omitProtocol = false;

      if (options.omit_common_protocols) {
        if (this.protocol === 'http' || this.protocol === 'https') {
          omitProtocol = true;
        }
      }

      if (!omitProtocol) {
        uri += `${this.protocol}://`;
      }
    }

    if (this.host) {
      uri += this.host + (this.port ? `:${this.port}` : '');
    }

    uri += this.path; // encodeURI(this.path)

    let firstParam = true;

    for (const key of Object.keys(this.parameters)) {
      uri += firstParam ? '?' : '&';
      uri += options.machine ? encodeURIComponent(key) : key;
      uri += '=';
      uri += options.machine ? encodeURIComponent(this.parameters[key]) : this.parameters[key];

      firstParam = false;
    }

    if (this.anchor) {
      uri += '#';
      uri += options.machine ? encodeURIComponent(this.anchor) : this.anchor;
    }

    return uri;
  }
}

// testing
(function test() {
  function assert(left, right) {
    if (left !== right) {
      throw new Error(`Assertion failed: got "${left}", expected "${right}"`);
    }
  }

  assert(new Uri('http://гугл.рф?раз=два#три').print(), 'http://гугл.рф?%D1%80%D0%B0%D0%B7=%D0%B4%D0%B2%D0%B0#%D1%82%D1%80%D0%B8');
  assert(new Uri('http://гугл.рф?раз=два#три').print({ machine: false }), 'http://гугл.рф?раз=два#три');
  assert(new Uri('google.ru').print(), 'google.ru');

  assert(parseUri('http://google.ru/root/path/test?parameters').path, '/root/path/test');
}());
