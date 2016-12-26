// The polyfill will emulate a full ES6 environment (for old browsers)
// (including generators, which means async/await)
import 'babel-polyfill';
import { render } from 'react-isomorphic-render/redux';
import { config } from './react-isomorphic-render';

require('../../assets/styles/style.scss');

// renders the webpage on the client side
render({
	// enable/disable development mode
  development: __DEVELOPMENT__,

	// enable/disable Redux dev-tools
  devtools: __DEVTOOLS__ ? require('./devtools') : undefined, // eslint-disable-line global-require
}, config);
