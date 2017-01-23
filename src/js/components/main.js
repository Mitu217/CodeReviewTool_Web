import React, { Component, PropTypes } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import Appbar from './appbar';

export default class Main extends Component {

  toggleMenu() {
    const nextVisible = !this.props.menuVisible;
    this.props.onChangeMenuVisible(nextVisible);
  }

  render() {
    const visible = this.props.menuVisible;
    return (
      <div>
        <Appbar
          onToggleMenu={ () => this.toggleMenu() }
        />

        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='dimmed push' width='large' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

Main.propTypes = {
  onChangeMenuVisible: PropTypes.func,
  menuVisible: PropTypes.bool,
};
