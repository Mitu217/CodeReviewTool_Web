import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

export const INITIAL_STATE = immutable({
  visible: false,
});

const changeMenuVisible = (state, action) => state.merge({
  visible: action.input,
});

const ACTION_HANDLERS = {
  [Types.MENU_VISIBLE_CHANGE]: changeMenuVisible,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
