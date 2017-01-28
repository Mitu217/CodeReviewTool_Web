import { createReducer } from 'reduxsauce';
import immutable from 'seamless-immutable';
import Types from '../actions/types';

export const INITIAL_STATE = immutable({
  visible: true,
  files: null,
  selectFile: '',
  currentDirNames: null,
  currentDirIds: null,
});

const changeMenuVisible = (state, action) => state.merge({
  visible: action.input,
});

const changeShowFiles = (state, action) => state.merge({
  files: action.input,
})

const changeSelectFile = (state, action) => state.merge({
  selectFile: action.input,
})

const changeCurrentDir = (state, action) => state.merge({
  currentDirNames: action.names,
  currentDirIds: action.ids,
})

const ACTION_HANDLERS = {
  [Types.MENU_VISIBLE_CHANGE]: changeMenuVisible,
  [Types.MENU_SHOW_FILES_CHANGE]: changeShowFiles,
  [Types.MENU_SELECT_FILE_CHANGE]: changeSelectFile,
  [Types.MENU_CURRENT_DIR_CHANGE]: changeCurrentDir,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
