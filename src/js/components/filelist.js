import React, { Component, PropTypes } from 'react'
import { Icon, Input, Label, Menu, Image } from 'semantic-ui-react'
import {  } from 'semantic-ui-react'

import Drive from '../lib/drive';

let clicked = false;

export default class FileList extends Component {


  render() {
    let list = [];
    const files = this.props.files;
    const select = this.props.selectFile;

    if(this.props.currentDirNames.length > 1) {
      list.push(
        <Menu.Item name='inbox' key='back' onClick={ () => this.onSelectBack() } >
          Back
        </Menu.Item>
      );
    }

    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      switch (file.mimeType) {
        case 'application/vnd.google-apps.folder': //ディレクトリ
          list.push(
            <Menu.Item name='inbox' active={ select === file.id } key={ file.id } data-id={ file.id } data-name={ file.name } onClick={ (e) => this.onSelectItem(e) } >
              <Image src={ file.iconLink } size='mini' />
              { file.name }
            </Menu.Item>
          );
          break;
        case 'application/vnd.google-apps.drive-sdk.629393106275': //専用ファイル
          list.push(
            <Menu.Item name='inbox' active={ select === file.id } key={ file.id } data-id={ file.id } data-name={ file.name } onClick={ (e) => this.onSelectItem(e) } >
              <Image src={ file.iconLink } size='mini' />
              { file.name }
            </Menu.Item>
          );

          break;
      }
    }

    return (
      <Menu vertical id='file-list'>
        { list }
      </Menu>
    );
  }

  onSelectItem(e) {
    const id = e.target.getAttribute('data-id');
    const name = e.target.getAttribute('data-name');
    if (clicked) {
      //double click
      let currentDirIds = [].concat(this.props.currentDirIds);
      let currentDirNames = [].concat(this.props.currentDirNames);
      currentDirIds.push(id);
      currentDirNames.push(name);
      this.props.getFileList(currentDirNames, currentDirIds);
      clicked = false;
    } else {
      //single click
      this.props.onChangeSelectFile(id);
      clicked = true;
      setTimeout(function () {
        clicked = false;
      }, 200);
    }
  }

  onSelectBack() {
      let currentDirIds = [].concat(this.props.currentDirIds);
      let currentDirNames = [].concat(this.props.currentDirNames);
      currentDirIds.pop();
      currentDirNames.pop();
      this.props.getFileList(currentDirNames, currentDirIds);
  }
}

FileList.propTypes = {
  files: PropTypes.array,
  selectFile: PropTypes.string,
  openedFile: PropTypes.string,
  currentDirIds: PropTypes.array,
  currentDirNames: PropTypes.array,
  onChangeShowFiles: PropTypes.func,
  onChangeSelectFile: PropTypes.func,
  onChangeOpenedFile: PropTypes.func,
  getFileList: PropTypes.func,
};
