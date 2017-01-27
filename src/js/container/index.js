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
      onChangeMenuVisible={ input => props.changeMenuVisible(input) }
      onChangeMenuShowFiles={ input => props.changeMenuShowFiles(input) }
    />
  </div>
);

Container.propTypes = {
  authState: PropTypes.string,
  changeOAuthState: PropTypes.func,

  menuVisible: PropTypes.bool,
  menuShowFiles: PropTypes.array,
  changeMenuVisible: PropTypes.func,
  changeMenuShowFiles: PropTypes.func,
};

const mapStateToProps = state => ({
  authState: state.auth.state,
  meunVisible: state.menu.visible,
  menuShowFiles: state.menu.files,
});

const mapDispatchToProps = dispatch => ({
  changeOAuthState: input => dispatch(Actions.changeOAuthState(input)),
  changeMenuVisible: input => dispatch(Actions.changeMenuVisible(input)),
  changeMenuShowFiles: input => dispatch(Actions.changeMenuShowFiles(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
