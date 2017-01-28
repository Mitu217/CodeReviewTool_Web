import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

export const INITIAL_STATE = immutable({
  openedFile: '',
});

const changeOpenedFile = (state, action) => state.merge({
  openedFile: action.input,
});

const ACTION_HANDLERS = {
  [Types.EDIT_OPENED_FILE_CHANGE]: changeOpenedFile,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
