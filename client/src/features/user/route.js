// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Home, FormAddUser, NewUserComfirInfo } from './';

export default {
  path: 'user',
  childRoutes: [{ path: 'home', component: Home }, { path: 'formAddUser', component: FormAddUser }, { path: 'newUserComfirInfo', component: NewUserComfirInfo }],
};
