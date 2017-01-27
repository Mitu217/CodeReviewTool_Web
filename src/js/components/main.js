import React, { Component, PropTypes } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import Drive from '../lib/drive';

import Appbar from './appbar';
import AppSidebar from './appSidebar';
import AppLoading from './appLoading';

export default class Main extends Component {

  constructor() {
    super();

    // TODO willmountの方が良い？
    // check authenticate
    Drive.checkOauth().then(
      () => this.authSuccess(),
      () => this.authFailure()
    );
  }
  authSuccess() {
    this.props.onChangeOAuthState('success');
  }
  authFailure() {
    this.props.onChangeOAuthState('failure');
  }

  render() {
    let contents = [];

    switch (this.props.authState) {
      case 'check': //認証チェック中
        contents.push(
          <AppLoading key='load' />
        );
        break;

      case 'success': //認証成功
        contents.push(
          <Appbar key='appbar'
            onToggleMenu={ () => this.toggleMenu() }
          />
        );
        contents.push(
          <Sidebar.Pushable key='sidebar' as={Segment}>
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
        );
        break;

      case 'failure': //認証失敗
        contents = '';
        break;
    }
    return (<div>{contents}</div>);
  }

  toggleMenu() {
    const nextVisible = !this.props.menuVisible;
    this.props.onChangeMenuVisible(nextVisible);
  }

}

Main.propTypes = {
  authState: PropTypes.string,
  onChangeOAuthState: PropTypes.func,
  menuVisible: PropTypes.bool,
  onChangeMenuVisible: PropTypes.func,
};
