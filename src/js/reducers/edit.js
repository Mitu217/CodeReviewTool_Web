import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

export const INITIAL_STATE = immutable({
  openedFile: '',
  outputDiff: '',
  outputComments: '',
});

const changeOpenedFile = (state, action) => state.merge({
  openedFile: action.input,
});

const changeOutputDiff = (state, action) => state.merge({
  outputDiff: action.input,
})

const changeOutputComments = (state, actoin) => state.merge({
  outputComments: action.input,
})

const ACTION_HANDLERS = {
  [Types.EDIT_OPENED_FILE_CHANGE]: changeOpenedFile,
  [Types.EDIT_OUTPUT_DIFF_CHANGE]: changeOutputDiff,
  [Types.EDIT_OUTPUT_COMMNETS_CHANGE]: changeOutputComments,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
