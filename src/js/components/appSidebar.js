import React, { Component, PropTypes } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import Drive from '../lib/drive';

import AppLoading from './appLoading';
import FileList from './filelist';

export default class AppSidebar extends Component {
  constructor() {
    super();

    let cacheParentIds = localStorage.getItem('currentParentId');
    let cacheParentNames = localStorage.getItem('currentParentName');
    if(cacheParentIds) {
      cacheParentIds = cacheParentIds.split(',');
    } else {
      cacheParentIds = ['root'];
    }
    if(cacheParentNames) {
      cacheParentNames = cacheParentNames.split(',');
    } else {
      cacheParentNames = ['マイドライブ'];
    }
    this.getFileList(cacheParentNames, cacheParentIds);
  }

  render() {
    let menuContents = [];
    if(this.props.showFiles) {
      menuContents.push(
        <FileList key='file-list'
          files={ this.props.showFiles }
          selectFile={ this.props.selectFile }
          openedFile={ this.props.openedFile }
          currentDirIds={ this.props.currentDirIds }
          currentDirNames={ this.props.currentDirNames }
          onChangeShowFiles={ input => this.props.onChangeShowFiles(input) }
          onChangeSelectFile={ input => this.props.onChangeSelectFile(input) }
          onChangeOpenedFile={ input => this.props.onChangeOpenedFile(input) }
          onChangeCurrentDir={ (name, id) => this.props.onChangeCurrentDir(name, id) }
          getFileList={ (name, id) => this.getFileList(name, id) }
        />
      );
      menuContents.push(
        <div id='create-newfile' key='newfile'>
          <Icon name='plus' size='big' onClick={ (e) => this.onSubmitNewFile(e) }/>
        </div>
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

  getFileList(parentNames=[], parentIds=[]) {
    Drive.getFileList(parentIds[parentIds.length-1]).then(
      (res) => {
        /* 非同期処理になったらsagaへもっていく部分 */
        localStorage.setItem('currentParentId', parentIds.join(','));
        localStorage.setItem('currentParentName', parentNames.join(','));
        this.props.onChangeCurrentDir(parentNames, parentIds);
        /**************************************/
        this.props.onChangeShowFiles(res.files);
      },
      (e) => { console.log(e); }
    )
  }

  onSubmitNewFile(e) {
    this.props.onChangeModalVisible(true);
  }
}

AppSidebar.propTypes = {
  visible: PropTypes.bool,
  showFiles: PropTypes.array,
  selectFile: PropTypes.string,
  openedFile: PropTypes.string,
  currentDirNames: PropTypes.array,
  currentDirIds: PropTypes.array,

  onChangeShowFiles: PropTypes.func,
  onChangeSelectFile: PropTypes.func,
  onChangeOpenedFile: PropTypes.func,
  onChangeCurrentDir: PropTypes.func,

  onChangeModalVisible: PropTypes.func,
};
