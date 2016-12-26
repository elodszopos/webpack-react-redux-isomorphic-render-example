const initialState = {
  loaded: false,
};

const handlers = {
  retrievingUsers: (result, state) => {
    const newState = {
      ...state,
      loading: true,
      loading_error: undefined,
    };

    return newState;
  },

  usersRetrieved: (result, state) => {
    const newState = {
      ...state,
      loading: false,
      loaded: true,
      stale: false,
      users: result,
    };

    return newState;
  },

  usersRetrievalFailed: (error, state) => {
    const newState = {
      ...state,
      loading: false,
      loading_error: error,
    };

    return newState;
  },

  addingUsers: (result, state) => {
    const newState = {
      ...state,
      adding: true,
    };

    return newState;
  },

  userAdded: (result, state) => {
    const newState = {
      ...state,
      adding: false,
      stale: true,
    };

    return newState;
  },

  addingUserFailed: (error, state) => {
    const newState = {
      ...state,
      adding: false,
      addingError: error,
    };

    return newState;
  },

  addingErrorDismissed: (result, state) => {
    const newState = {
      ...state,
      addingError: undefined,
    };

    return newState;
  },

  deletingUser: (result, state) => {
    const newState = {
      ...state,
      deleting: true,
    };

    return newState;
  },

  userDeleted: (result, state) => {
    const newState = {
      ...state,
      deleting: false,
      stale: true,
    };

    return newState;
  },

  deletingUserFailed: (error, state) => {
    const newState = {
      ...state,
      deleting: false,
      deleting_error: error,
    };

    return newState;
  },
};

// for this module to work should be added to reducers/index.js

// applies a handler based on the action type
// (is copy & paste'd for all action response handlers)
export default function (state = initialState, actionData = {}) {
  return (handlers[actionData.type] || ((result, state) => state))(actionData.result || actionData.error || actionData, state); // eslint-disable-line no-shadow
}
