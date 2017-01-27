import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

export const INITIAL_STATE = immutable({
  state: 'check',
});

const changeOAuthState = (state, action) => state.merge({
  state: action.input,
});

const ACTION_HANDLERS = {
  [Types.OAUTH_STATE_CHANGE]: changeOAuthState,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
