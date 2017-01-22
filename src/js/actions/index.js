import Types from './types';

// 起動時の設定
const startup = () => ({ type: Types.STARTUP });

// menu/visibleのstate変更
const changeMenuVisible = input => ({ type: Types.MENU_VISIBLE_CHANGE, input });


/*** enabled Actoins ***/
export default {
  startup,
  changeMenuVisible,
};
