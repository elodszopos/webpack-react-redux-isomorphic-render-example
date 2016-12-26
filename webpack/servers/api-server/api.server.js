require('../common/server.entry');
const webService = require('web-service');
const log = require('../common/log').create('webapp.api');
const apiExample = require('./example');
const configuration = require('../common/configuration');

const apiService = webService.api({
  name: 'Example API service',
  api: [apiExample],
  log,
});

apiService.listen(configuration.apiServer.http.port).then(() => {
  log.info(`Api server is listening at http://${configuration.apiServer.http.host}:${configuration.apiServer.http.port}`);
},
(error) => {
  log.error(error);
});
