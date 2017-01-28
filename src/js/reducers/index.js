import { combineReducers } from 'redux';

import Auth from './auth';
import Menu from './menu';
import Edit from './edit';

const rootReducer = combineReducers({
  auth: Auth,
  menu: Menu,
  edit: Edit,
});

export default rootReducer;
