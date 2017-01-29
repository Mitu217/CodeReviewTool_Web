import React, { Component, PropTypes } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

import Drive from '../lib/drive';

import AppLoading from './appLoading';
import Appbar from './appbar';
import Contents from './contents';
import NewFileModal from './newFileModal';

export default class Main extends Component {

  constructor() {
    super();

    // TODO willmountの方が良い？
    // check authenticate
    Drive.checkOauth().then(
      () => Drive.checkRealtimeOauth().then(
        () => this.authSuccess(),
        () => this.authFailure()
      ),
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
            menuSelectFile={ this.props.menuSelectFile }
            menuCurrentDirNames={ this.props.menuCurrentDirNames }
            menuCurrentDirIds={ this.props.menuCurrentDirIds }
            onChangeMenuShowFiles={ input => this.props.onChangeMenuShowFiles(input) }
            onChangeMenuSelectFile={ input => this.props.onChangeMenuSelectFile(input) }
            onChangeMenuCurrentDir={ (name, id) => this.props.onChangeMenuCurrentDir(name, id) }

            editOpenedFile={ this.props.editOpenedFile }
            onChangeEditOpenedFile={ input => this.props.onChangeEditOpenedFile(input) }

            onChangeModalVisible={ input => this.props.onChangeModalVisible(input) }
          />
        );
        contents.push(
          <NewFileModal key='newFileModal'
            visible={ this.props.modalVisible }
            onChangeVisible={ input => this.props.onChangeModalVisible(input) }
          />
        )
        break;

      case 'failure': //認証失敗
        contents = '';
        break;
    }
    return (
      <div>
        {contents}
      </div>
    );
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
  menuSelectFile: PropTypes.string,
  menuCurrentDirNames: PropTypes.array,
  menuCurrentDirIds: PropTypes.array,
  onChangeMenuVisible: PropTypes.func,
  onChangeMenuShowFiles: PropTypes.func,
  onChangeMenuSelectFile: PropTypes.func,
  onChangeMenuCurrentDir: PropTypes.func,

  editOpenedFile: PropTypes.string,
  onChangeEditOpenedFile: PropTypes.func,

  modalVisible: PropTypes.bool,
  onChangeModalVisible: PropTypes.func,
};
