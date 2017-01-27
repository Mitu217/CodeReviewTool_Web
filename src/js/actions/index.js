import Types from './types';

// 起動時の設定
const startup = () => ({ type: Types.STARTUP });

// menu/visibleのstate変更
const changeMenuVisible = input => ({ type: Types.MENU_VISIBLE_CHANGE, input });
// 表示するファイルの変更
const changeMenuShowFiles = input => ({ type: Types.MENU_SHOW_FILES_CHANGE, input });

// oauthTokenのstageを変更
const changeOAuthState = input => ({ type: Types.OAUTH_STATE_CHANGE, input});


/*** enabled Actoins ***/
export default {
  //Init
  startup,

  //Sidebar
  changeMenuVisible,
  changeMenuShowFiles,

  //Auth
  changeOAuthState,
};
