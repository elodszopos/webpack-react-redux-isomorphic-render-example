import React from 'react';
import { title } from 'react-isomorphic-render';
import styler from 'react-styling';

const style = styler // eslint-disable-line
  `
	header
		text-align: center
`;

const NotFound = () => (
	<div>
		{title('Page not found')}

		<h1 style={style.header}>
			Page not found
		</h1>
	</div>
);

export default NotFound;
