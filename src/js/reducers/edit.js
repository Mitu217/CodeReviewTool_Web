import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

export const INITIAL_STATE = immutable({
  openedFile: '',
  outputDiff: '',
});

const changeOpenedFile = (state, action) => state.merge({
  openedFile: action.input,
});

const changeOutputDiff = (state, action) => state.merge({
  outputDiff: action.input,
})

const ACTION_HANDLERS = {
  [Types.EDIT_OPENED_FILE_CHANGE]: changeOpenedFile,
  [Types.EDIT_OUTPUT_DIFF_CHANGE]: changeOutputDiff,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
