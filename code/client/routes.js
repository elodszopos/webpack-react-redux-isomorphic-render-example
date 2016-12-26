import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import { Layout } from './pages/layout';
import { NotFound } from './pages/not found';
import { Users } from './pages/users';
import { Page as Home } from './pages/home';

function getRoutes() {
  return (
		<Route path="/" component={Layout}>
			<IndexRoute component={Home} />
			<Route path="users" component={Users} />
			<Route path="*" component={NotFound} />
		</Route>
  );
}

export { getRoutes };
