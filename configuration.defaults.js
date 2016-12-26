module.exports = {
  apiServer: {
    http: {
      host: '127.0.0.1',
      port: 3002,
    },
  },
  webpageServer: {
    http: {
      host: '127.0.0.1',
      port: 3003,
    },
  },
  webServer: {
    http: {
      host: '127.0.0.1',
      port: 3000,
    },
  },
  session_secret_keys: ['stackenblochen'],
  development: {
    webpack: {
      development_server: {
        host: '127.0.0.1',
        port: 3001,
      },
    },
  },
};
