import React, { PureComponent, PropTypes } from 'react';
import styler from 'react-styling';

const style = styler // eslint-disable-line
  `
	container
		position : relative
		display  : inline-block

	spinner
		position   : absolute
		z-index    : -1
		bottom     : 0.25em
		transition : opacity 300ms ease-out

		&show
			opacity          : 1
			transition-delay : 350ms
		&hide
			transition : opacity 200ms ease-out
			opacity    : 0

	button
		&show
			opacity          : 1
			transition       : opacity 150ms ease-out
			transition-delay : 100ms
		&hide
			opacity          : 0
			transition       : opacity 200ms ease-out
			transition-delay : 300ms
`;

export default class Button extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    busy: PropTypes.bool,
    style: PropTypes.object,
  };

  render()	{
    const { busy, onClick, text } = this.props;

    return (
      <div style={{ ...style.container, ...this.props.style }}>
        <span className="spinner" style={busy ? style.spinner.show : style.spinner.hide} />
        <button disabled={busy} onClick={onClick} style={busy ? style.button.hide : style.button.show}>{text}</button>
      </div>
    );
  }
}
