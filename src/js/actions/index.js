import Types from './types';

// 起動時の設定
const startup = () => ({ type: Types.STARTUP });

// menu/visibleのstate変更
const changeMenuVisible = input => ({ type: Types.MENU_VISIBLE_CHANGE, input });

// oauthTokenのstageを変更
const changeOAuthState = input => ({ type: Types.OAUTH_STATE_CHANGE, input});


/*** enabled Actoins ***/
export default {
  startup,

  changeMenuVisible,

  changeOAuthState,
};
