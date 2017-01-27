import React, { Component, PropTypes } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

import Drive from '../lib/drive';

import AppLoading from './appLoading';
import Appbar from './appbar';
import Contents from './contents';

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
    Drive.loadGoogleDrive().then(
      () => this.props.onChangeOAuthState('success'),
      () => this.authFailure()
    );
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
          <Contents key='contents'
            menuVisible={ this.props.menuVisible }
            menuShowFiles={ this.props.menuShowFiles }
            onChangeMenuShowFiles={ input => this.props.onChangeMenuShowFiles(input) }
          />
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
  menuShowFiles: PropTypes.array,
  onChangeMenuVisible: PropTypes.func,
  onChangeMenuShowFiles: PropTypes.func,
};
