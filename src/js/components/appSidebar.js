import React, { Component, PropTypes } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import Drive from '../lib/drive';

import AppLoading from './appLoading';
import FileList from './filelist';

export default class AppSidebar extends Component {
  constructor() {
    super();

    // ファイルリストの取得
    Drive.getFileList().then(
      (res) => { this.props.onChangeShowFiles(res.files) },
      (e) => { console.log(e); }
    )
  }

  render() {
    let menuContents = [];
    if(this.props.showFiles) {
      menuContents.push(
        <FileList key='file-list'
          files={ this.props.showFiles }
        />
      );
    } else {
      menuContents.push(
        <AppLoading key='load' />
      );
    }

    const visible = this.props.visible;
    return (
      <Sidebar id='menu' animation='push' visible={visible} >
        {menuContents}
      </Sidebar>
    );
  }
}

AppSidebar.propTypes = {
  visible: PropTypes.bool,
  showFiles: PropTypes.array,
  onChangeShowFiles: PropTypes.func,
};
