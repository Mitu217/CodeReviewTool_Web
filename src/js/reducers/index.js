import { combineReducers } from 'redux';

import Auth from './auth';
import Menu from './menu';
import Edit from './edit';
import Modal from './modal';

const rootReducer = combineReducers({
  auth: Auth,
  menu: Menu,
  edit: Edit,
  modal: Modal,
});

export default rootReducer;
