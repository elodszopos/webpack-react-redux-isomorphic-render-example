import React, { PureComponent, PropTypes } from 'react';
import { Provider } from 'react-redux';

const { object, node } = PropTypes;

export class Wrapper extends PureComponent {
  static propTypes = {
    store: object.isRequired,
    children: node.isRequired,
  };

	// all React "prop"erty providers go here.
	// e.g. redux Provider, react-intl IntlProvider.
	//
  render()	{
    const { store, children } = this.props;

    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
}
