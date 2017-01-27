import React, { Component, PropTypes } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

export default class AppSidebar extends Component {

  render() {
    const visible = this.props.visible;
    return (
      <Sidebar id='menu' as={Menu} animation='push' visible={visible} icon='labeled' vertical inverted>
        テストメニュー
      </Sidebar>
    );
  }
}

AppSidebar.propTypes = {
  visible: PropTypes.bool,
};
