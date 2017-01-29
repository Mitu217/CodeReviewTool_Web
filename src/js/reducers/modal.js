import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

export const INITIAL_STATE = immutable({
  visible: false,
});

const changeModalVisible = (state, action) => state.merge({
  visible: action.input,
});

const ACTION_HANDLERS = {
  [Types.MODAL_VISIBLE_CHANGE]: changeModalVisible,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
