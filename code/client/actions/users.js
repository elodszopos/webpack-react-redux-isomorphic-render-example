export function get() {
  const action =
    {
      promise: async (http) =>		{
        const userIds = await http.get('/api/example/users');

        return Promise.all(userIds.map(id => http.get(`/api/example/users/${id}`)));
      },
      events: ['retrievingUsers', 'usersRetrieved', 'usersRetrievalFailed'],
    };

  return action;
}

export function add(info) {
	// maybe add validation here

  const action =
    {
      promise: http => http.post('/api/example/users', info),
      events: ['addingUsers', 'userAdded', 'addingUserFailed'],
    };

  return action;
}

export function remove(id) {
  const action =
    {
      promise: http => http.delete(`/api/example/users/${id}`),
      events: ['deletingUser', 'userDeleted', 'deletingUserFailed'],
    };

  return action;
}

export function dismissAddingError() {
  return { type: 'addingErrorDismissed' };
}
