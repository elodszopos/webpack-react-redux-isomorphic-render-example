import React, { Component, PropTypes } from 'react';
import styler from 'react-styling';
import { connect } from 'react-redux';
import { title } from 'react-isomorphic-render';
import { preload } from 'react-isomorphic-render/redux';
import { bindActionCreators } from 'redux';

import { get as getUsers, add as addUser, remove as deleteUser, dismissAddingError } from '../actions/users';
import Button from '../components/button';

const style = styler // eslint-disable-line
  `
	container

	users
		margin-top : 2em

		list
			display         : inline-block
			list-style-type : none
			padding-left    : 1em

			title
				font-weight : bold

		refresh
			margin-left : 1em

		add
			margin-left : 1em

		delete
			margin-left : 1em

	user
		id
			color        : #9f9f9f

		name
			margin-left : 0.3em
`;

const { func, array, bool, object } = PropTypes;

@preload(({ dispatch }) => dispatch(getUsers()))
@connect(
  store =>
    ({
      users: store.users.users,
      loading: store.users.loading,
      loaded: store.users.loaded,
      stale: store.users.stale,
      loading_error: store.users.loading_error,
      addingError: store.users.addingError,
    }),
  dispatch => bindActionCreators({
    getUsers,
    addUser,
    deleteUser,
    dismissAddingError,
  }, dispatch),
)
class Users extends Component {
  static propTypes = {
    getUsers: func.isRequired,
    addUser: func.isRequired,
    deleteUser: func.isRequired,
    users: array.isRequired,
    dismissAddingError: func,
    // loading: bool,
    error: bool,
    deleting: bool,
    loaded: bool,
    stale: bool,
    // loading_error: object,
    // addingError: object,
  };

  static contextTypes = {
    store: object.isRequired,
  };

  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.addUser = this.addUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.stale && nextProps.stale) {
      this.refresh();
    }

    if (nextProps.addingError) {
      alert('Failed to add the user');

      this.props.dismissAddingError();
    }
  }

  refresh() {
    this.props.getUsers();
  }

  addUser() {
    const name = prompt('Enter user\'s name');

    if (!name) {
      return;
    }

    this.props.addUser({ name });
  }

  deleteUser(id) {
    this.props.deleteUser(id);
  }

  renderUsers(error, loaded, users) {
    if (error) {
      const markup =
        (
          <div style={style.users}>
            {'Failed to load the list of users'}

            {/* error.stack || error */}

            <button onClick={this.refresh} style={style.users.refresh}>Try again</button>
          </div>
        );

      return markup;
    }

    if (!loaded) {
      return <div style={style.users}>Loading users</div>;
    }

    if (!users.length) {
      const markup =
        (
          <div style={style.users}>
            No users

            <button onClick={this.addUser} style={style.users.add}>Add user</button>

            <button onClick={this.refresh} style={style.users.refresh}>Refresh</button>
          </div>
        );

      return markup;
    }

    const markup =
      (
        <div style={style.users}>
          <span style={style.users.list.title}>Users</span>

          <button onClick={this.addUser} style={style.users.add}>Add user</button>

          <button onClick={this.refresh} style={style.users.refresh}>Refresh</button>

          <div>
            <ul style={style.users.list}>
              {users.map(user =>
                <li key={user.id}>
                  <span style={style.user.id}>{user.id}</span>

                  <span style={style.user.name}>{user.name}</span>

                  <Button
                    busy={this.props.deleting}
                    onClick={() => this.deleteUser(user.id)}
                    text="delete user"
                    style={style.users.delete}
                  />
                </li>)}
            </ul>
          </div>
        </div>
      );

    return markup;
  }

  render() {
    const { error, loaded, users } = this.props;

    const markup =
      (
        <section>
          {title('Simple REST API example')}

          <div style={style.container}>
            <p>This is an example of REST API usage with no database persistence</p>

            {this.renderUsers(error, loaded, users)}
          </div>
        </section>
      );

    return markup;
  }
}

export { Users };
