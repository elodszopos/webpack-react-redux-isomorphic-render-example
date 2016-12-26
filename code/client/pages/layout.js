import React, { PureComponent, PropTypes } from 'react';

import { head } from 'react-isomorphic-render';

import Menu from '../components/menu';

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    // Html document metadata

    const title = 'WebApp';

    const meta =
      [
        // <meta charset="utf-8"/>
        { charset: 'utf-8' },

        // <meta name="..." content="..."/>
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, user-scalable=no',
        },

        // <meta property="..." content="..."/>
        {
          property: 'og:title',
          content: 'International Bodybuilders Club',
        },
        {
          property: 'og:description',
          content: 'Do some push ups',
        },
        {
          property: 'og:locale',
          content: 'ru-RU',
        },
      ];

    const menuItems = [{
      name: 'Home',
      link: '/',
    }, {
      name: 'Users',
      link: '/users',
    }];

    return (
      <div className="content">
        {head(title, meta)}

        {/* header */}
        <header>
          {/* Navigation */}
          {/* <nav>*/}
          {/* main menu */}
          <Menu items={menuItems} />
          {/* </nav>*/}
        </header>

        {this.props.children}

        <footer />
      </div>
    );
  }
}
