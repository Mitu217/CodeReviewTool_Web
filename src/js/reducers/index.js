import { combineReducers } from 'redux';

import Auth from './auth';
import Menu from './menu';

const rootReducer = combineReducers({
  auth: Auth,
  menu: Menu,
});

export default rootReducer;
