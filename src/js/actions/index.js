import Types from './types';

// 起動時の設定
const startup = () => ({ type: Types.STARTUP });

// menu/visibleのstate変更
const changeMenuVisible = input => ({ type: Types.MENU_VISIBLE_CHANGE, input });
// 表示するファイルの変更
const changeMenuShowFiles = input => ({ type: Types.MENU_SHOW_FILES_CHANGE, input });
// 選択しているファイルの変更
const changeMenuSelectFile = input => ({ type: Types.MENU_SELECT_FILE_CHANGE, input });
// 表示しているディレクトリの変更
const changeMenuCurrentDir = (names, ids) => ({ type: Types.MENU_CURRENT_DIR_CHANGE, names, ids });

// 開いているファイルの変更
const changeEditOpenedFile = input => ({ type: Types.EDIT_OPENED_FILE_CHANGE, input });
// 表示するdiffのstateを更新
const changeEditOutputDiff = input => ({ type: Types.EDIT_OUTPUT_DIFF_CHANGE, input });

// oauthTokenのstageを変更
const changeOAuthState = input => ({ type: Types.OAUTH_STATE_CHANGE, input});

// modal/visibleのstateを変更
const changeModalVisible = input => ({ type: Types.MODAL_VISIBLE_CHANGE, input });

/*** enabled Actoins ***/
export default {
  //Init
  startup,

  //menu
  changeMenuVisible,
  changeMenuShowFiles,
  changeMenuSelectFile,
  changeMenuCurrentDir,

  //editer
  changeEditOpenedFile,
  changeEditOutputDiff,

  //Auth
  changeOAuthState,

  //modal
  changeModalVisible,
};
