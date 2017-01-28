import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import Actions from '../actions';

import Main from '../components/main';

const Container = props => (
  <div>
    <Main
      authState={ props.authState }
      onChangeOAuthState={ input => props.changeOAuthState(input) }

      menuVisible={ props.meunVisible }
      menuShowFiles={ props.menuShowFiles }
      menuSelectFile={ props.menuSelectFile }
      menuCurrentDirNames={ props.menuCurrentDirNames }
      menuCurrentDirIds={ props.menuCurrentDirIds }
      onChangeMenuVisible={ input => props.changeMenuVisible(input) }
      onChangeMenuShowFiles={ input => props.changeMenuShowFiles(input) }
      onChangeMenuSelectFile={ input => props.changeMenuSelectFile(input) }
      onChangeMenuCurrentDir={ (names, ids) => props.changeMenuCurrentDir(names, ids) }

      editOpenedFile={ props.editOpenedFile }
      onChangeEditOpenedFile={ input => props.changeEditOpenedFile(input) }
    />
  </div>
);


Container.propTypes = {
  authState: PropTypes.string,
  changeOAuthState: PropTypes.func,

  menuVisible: PropTypes.bool,
  menuShowFiles: PropTypes.array,
  menuSelectFile: PropTypes.string,
  menuCurrentDirNames: PropTypes.array,
  menuCurrentDirIds: PropTypes.array,
  changeMenuVisible: PropTypes.func,
  changeMenuShowFiles: PropTypes.func,
  changeMenuSelectFile: PropTypes.func,
  changeMenuCurrentDir:  PropTypes.func,

  editOpenedFile: PropTypes.string,
  changeEditOpenedFile: PropTypes.func,
};


const mapStateToProps = state => ({
  authState: state.auth.state,

  meunVisible: state.menu.visible,
  menuShowFiles: state.menu.files,
  menuSelectFile: state.menu.selectFile,
  menuCurrentDirNames: state.menu.currentDirNames,
  menuCurrentDirIds: state.menu.currentDirIds,

  editOpenedFile: state.edit.openedFile,
});


const mapDispatchToProps = dispatch => ({
  changeOAuthState: input => dispatch(Actions.changeOAuthState(input)),

  changeMenuVisible: input => dispatch(Actions.changeMenuVisible(input)),
  changeMenuShowFiles: input => dispatch(Actions.changeMenuShowFiles(input)),
  changeMenuSelectFile: input => dispatch(Actions.changeMenuSelectFile(input)),
  changeMenuCurrentDir: (names, ids) => dispatch(Actions.changeMenuCurrentDir(names, ids)),

  changeEditOpenedFile: input => dispatch(Actions.changeEditOpenedFile(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
