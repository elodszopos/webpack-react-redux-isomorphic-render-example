import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import s from './Button.scss';

export default class Button extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    busy: PropTypes.bool,
    // style: PropTypes.object,
  };

  render() {
    const { busy, onClick, text } = this.props;

    return (
      <div className={s.container}>
        <span className={cx(s.spinner, busy ? s.visible : s.hidden)} />
        <button disabled={busy} onClick={onClick} className={busy ? s.hide : s.show}>{text}</button>
      </div>
    );
  }
}
