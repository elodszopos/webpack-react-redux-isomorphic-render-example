const webService = require('web-service');

const apiExample = require('./api/example');

const apiService = webService.api({
  name: 'Example API service',
  api: [apiExample],
  log,
});

apiService.listen(configuration.api_server.http.port).then(() => {
  log.info(`Api server is listening at http://${configuration.api_server.http.host}:${configuration.api_server.http.port}`);
},
(error) => {
  log.error(error);
});
