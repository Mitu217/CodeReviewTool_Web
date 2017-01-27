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
      onChangeMenuVisible={ input => props.changeMenuVisible(input) }
    />
  </div>
);

Container.propTypes = {
  authState: PropTypes.string,
  changeOAuthState: PropTypes.func,
  menuVisible: PropTypes.bool,
  changeMenuVisible: PropTypes.func,
};

const mapStateToProps = state => ({
  authState: state.auth.state,
  meunVisible: state.menu.visible,
});

const mapDispatchToProps = dispatch => ({
  changeOAuthState: input => dispatch(Actions.changeOAuthState(input)),
  changeMenuVisible: input => dispatch(Actions.changeMenuVisible(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
