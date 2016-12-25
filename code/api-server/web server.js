import { api } from 'web-service';

const apiService = api({
  name: 'Example API service',
  api: [require('./api/example')],
  log,
});

apiService.listen(configuration.api_server.http.port).then(() => {
  log.info(`Api server is listening at http://${configuration.api_server.http.host}:${configuration.api_server.http.port}`);
},
(error) => {
  log.error(error);
});
