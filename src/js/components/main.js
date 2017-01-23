import React, { Component, PropTypes } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import Appbar from './appbar';
import AppSidebar from './appSidebar';

import OauthDrive from '../lib/oauthDrive';

export default class Main extends Component {

  toggleMenu() {
    const nextVisible = !this.props.menuVisible;
    this.props.onChangeMenuVisible(nextVisible);
  }

  render() {
    return (
      <div>
        <Appbar
          onToggleMenu={ () => this.toggleMenu() }
        />

        <Sidebar.Pushable as={Segment}>
          <AppSidebar
            visible={ this.props.menuVisible }
          />
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
