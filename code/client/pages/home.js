import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import styler from 'react-styling';
import { title } from 'react-isomorphic-render';

export default class Page extends Component
{
  render()	{
    const husky = require('../../../assets/images/husky.jpg');

    const markup =
		(
			<section className="content">
				{title('Home')}

				<h1 style={style.header}>
					Husky
				</h1>

				<img src={husky} style={style.image} />
			</section>
		);
    //
    // "eslint": "^3.8.0",
    // "eslint-config-airbnb": "^12.0.0",
    // "eslint-loader": "^1.6.0",
    // "eslint-plugin-flowtype": "2.18.1",
    // "eslint-plugin-import": "^2.0.1",
    // "eslint-plugin-jsx-a11y": "^2.2.3",
    // "eslint-plugin-react": "^6.5.0",
    // "eslint-watch": "^2.1.14",

    return markup;
  }
}

const style = styler
`
	header
		text-align: center

	image
		display: block

		margin-left  : auto
		margin-right : auto

		border-width : 1px
		border-style : solid
		border-color : #7f7f7f

		border-radius : 0.5em
`;
