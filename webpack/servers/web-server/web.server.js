require('../common/server.entry');
const log = require('../common/log')('webapp.server');
const path = require('path');
const webService = require('web-service');
const config = require('../common/configuration');

const web = webService({ log });
const root = path.resolve(__dirname, '../../..');

// serve static files
web.files('/assets', path.join(root, 'build', 'assets'));

// if it's not a static file url:

// Proxy /api requests to API server
web.proxy('/api', `http://${config.apiServer.http.host}:${config.apiServer.http.port}`, { name: 'API service' });

// Proxy all the rest requests to Webpage rendering server
web.proxy(`http://${config.webpageServer.http.host}:${config.webpageServer.http.port}`, { name: 'Page rendering service' });

// поднять http сервер
web.listen(config.webServer.http.port).then(() => {
  log.info('Web server is listening');
  log.info(`Now go to http://${config.webServer.http.host}:${config.webServer.http.port}`);
}, (error) => { log.error(error); });
