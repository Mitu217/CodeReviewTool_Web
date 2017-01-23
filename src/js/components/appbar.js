import React, { Component, PropTypes } from 'react'
import { Icon } from 'semantic-ui-react'

export default class Appbar extends Component {

  render() {
    return (
      <div id='appbar'>
        <Icon id='sidebar-icon' name='sidebar' size='large' onClick={( ) => this.props.onToggleMenu() }/>

      </div>
    );
  }
}

Appbar.propTypes = {
  onToggleMenu: PropTypes.func,
};
