import React from 'react';

import styler from 'react-styling';
import { title } from 'react-isomorphic-render';

const husky = require('../../../assets/images/husky.jpg');

const style = styler // eslint-disable-line
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

const Page = () => (
	<section className="content">
		{title('Home')}

		<h1 style={style.header}>
			Husky
		</h1>

		<img role="presentation" src={husky} style={style.image} />
	</section>
);

export { Page };
