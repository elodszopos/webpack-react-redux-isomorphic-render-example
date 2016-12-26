import React from 'react';
import webPageServer from 'react-isomorphic-render/build/page-server/web server';
import { devtools } from 'universal-webpack';
import { create as createLogger } from '../../webpack/servers/common/log';
import configuration from '../../configuration.defaults';
import { config } from '../client/react-isomorphic-render';

const log = createLogger('webpage.renderer');

function createPageServer(parameters) {
  // Starts webpage rendering server
  const server = webPageServer({
    // Http Urls to javascripts and (optionally) CSS styles
    // which will be insterted into the <head/> element of the resulting Html webpage
    // (as <script src="..."/> and <link rel="style" href="..."/> respectively)
    //
    // Also a website "favicon".
    //
    assets: (url) => { // eslint-disable-line no-unused-vars
      // Retrieve asset chunk file names
      // (which are output by client side Webpack build)
      const result = { ...parameters.chunks() };

      // Webpack entry point (can be used for code splitting)
      result.entry = 'main';

      // Clear Webpack require() cache for hot reload in development mode
      // (this is not necessary)
      if (__DEVELOPMENT__) {
        delete require.cache[require.resolve('../../assets/images/icon/cat_64x64.png')];
      }

      // Add "favicon"
      result.icon = require('../../assets/images/icon/cat_64x64.png'); // eslint-disable-line global-require

      // Return assets
      return result;
    },

    // Http host and port for executing all client-side ajax requests on server-side
    application: {
      host: configuration.webServer.http.host,
      port: configuration.webServer.http.port,
    },

    html: {
      // Will be inserted into server rendered webpage <head/>
      // (this `head()` function is optional and is not required)
      // (its gonna work with or without this `head()` parameter)
      head: (url) => {  // eslint-disable-line no-unused-vars
        if (__DEVELOPMENT__) {
          // `devtools` just tampers with CSS styles a bit.
          // It's not required for operation and can be omitted.
          const script = devtools({
            ...parameters,
            entry: 'main',
          });

          return <script dangerouslySetInnerHTML={{ __html: script }}/>; // eslint-disable-line
        }

        return null;
      },
    },
  }, config);

  // Start webpage rendering server
  server.listen(configuration.webpageServer.http.port, (error) => {
    if (error) {
      log.error('Webpage rendering server shutdown due to an error', error);
      throw error;
    }

    log.info(`Webpage server is listening at http://localhost:${configuration.webpageServer.http.port}`);
  });
}

export default createPageServer;
