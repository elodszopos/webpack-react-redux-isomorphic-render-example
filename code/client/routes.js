import React from 'react';

import { Route, IndexRoute } from 'react-router';

import Layout from './pages/layout';
import NotFound from './pages/not found';
import Users from './pages/users';
import Home from './pages/home';

export default function () { // ({ dispatch, getState })
  return (
		<Route path="/" component={Layout}>
			<IndexRoute component={Home} />
			<Route path="users" component={Users} />
			<Route path="*" component={NotFound} />
		</Route>
  );
}
