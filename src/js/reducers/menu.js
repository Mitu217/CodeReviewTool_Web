import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

export const INITIAL_STATE = immutable({
  visible: true,
  files: null
});

const changeMenuVisible = (state, action) => state.merge({
  visible: action.input,
});

const changeShowFiles = (state, action) => state.merge({
  files: action.input,
})

const ACTION_HANDLERS = {
  [Types.MENU_VISIBLE_CHANGE]: changeMenuVisible,
  [Types.MENU_SHOW_FILES_CHANGE]: changeShowFiles,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
