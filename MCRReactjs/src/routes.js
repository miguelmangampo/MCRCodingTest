import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Users = React.lazy(() => import('./views/Users/Users'));
const UserDetails = React.lazy(() => import('./views/Users/UserDetails'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users-details/:id', exact: true,  name: 'Users Details', component: UserDetails },
];

export default routes;
