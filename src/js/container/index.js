import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import Actions from '../actions';

import Main from '../components/main';

const Container = props => (
  <div>
    <Main
      onChangeMenuVisible={input => props.changeMenuVisible(input)}
      menuVisible={ props.meunVisible }
    />
  </div>
);

Container.propTypes = {
  changeMenuSetting: PropTypes.func,
  menuVisible: PropTypes.bool,
};

const mapStateToProps = state => ({
  meunVisible: state.menu.visible,
});

const mapDispatchToProps = dispatch => ({
  changeMenuVisible: input => dispatch(Actions.changeMenuVisible(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
