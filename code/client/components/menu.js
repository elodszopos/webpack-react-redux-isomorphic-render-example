import React, { PropTypes, PureComponent } from 'react';

import { Link, IndexLink } from 'react-router';

import styler from 'react-styling';

const style = styler // eslint-disable-line
  `
	menu
		margin-top    : 0
		margin-bottom : 0

		list-style-type : none
		padding         : 0

		item
			display: inline-block

			link
				display         : inline-block
				text-decoration : none
`;

function renderLink(item)	{
  if (item.link === '/')		{
    return <IndexLink to={item.link} style={style.menu.item.link} activeClassName="menu-item-selected" className="menu-item">{item.name}</IndexLink>;
  }

  return <Link to={item.link} style={style.menu.item.link} activeClassName="menu-item-selected" className="menu-item">{item.name}</Link>;
}

const { array } = PropTypes;

export default class Menu extends PureComponent {
  static propTypes = {
    items: array,
  };

  render()	{
    const { items } = this.props;

    return (
      <ul style={style.menu} className="menu">
        { items.map((item, i) => <li key={i} style={style.menu.item}>{renderLink(item)}</li>) }
      </ul>
    );
  }
}
