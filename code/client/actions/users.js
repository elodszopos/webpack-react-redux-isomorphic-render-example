export function get() {
  return {
    promise: async(http) => {
      const userIds = await http.get('/api/example/users');

      return Promise.all(userIds.map(id => http.get(`/api/example/users/${id}`)));
    },
    events: ['retrievingUsers', 'usersRetrieved', 'usersRetrievalFailed'],
  };
}

export function add(info) {
  return {
    promise: http => http.post('/api/example/users', info),
    events: ['addingUsers', 'userAdded', 'addingUserFailed'],
  };
}

export function remove(id) {
  return {
    promise: http => http.delete(`/api/example/users/${id}`),
    events: ['deletingUser', 'userDeleted', 'deletingUserFailed'],
  };
}

export function dismissAddingError() {
  return { type: 'addingErrorDismissed' };
}
