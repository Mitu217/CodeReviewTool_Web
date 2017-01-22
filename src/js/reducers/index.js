import { combineReducers } from 'redux';

import Menu from './menu';

const rootReducer = combineReducers({
  menu: Menu,
});

export default rootReducer;
