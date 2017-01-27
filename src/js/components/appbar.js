import React, { Component, PropTypes } from 'react'
import { Icon } from 'semantic-ui-react'

export default class Appbar extends Component {

  render() {
    return (
      <div id='appbar'>
        <Icon id='sidebar-icon' name='sidebar' size='large' onClick={ () => this.props.onToggleMenu() }/>
        <Icon id='options-icon' name='ellipsis vertical' size='large'/>
      </div>
    );
  }
}

Appbar.propTypes = {
  onToggleMenu: PropTypes.func,
  onToggleOptions: PropTypes.func,
};
