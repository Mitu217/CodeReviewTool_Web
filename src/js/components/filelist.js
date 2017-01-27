import React, { Component, PropTypes } from 'react'
import { Icon, Input, Label, Menu, Image } from 'semantic-ui-react'
import {  } from 'semantic-ui-react'
export default class FileList extends Component {

  render() {
    let list = [];
    const files = this.props.files;

    // ルートディレクトリでなければ../ボタンを作る
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      switch (file.mimeType) {
        case 'application/vnd.google-apps.folder':
          //ディレクトリ
          list.push(
            <Menu.Item name='inbox' key={ file.id } data-id={ file.id }>
              <Image src={ file.iconLink } size='mini' />
              { file.name }
            </Menu.Item>
          );
          break;
        case 'application/vnd.google-apps.drive-sdk.629393106275':
          //アプリ用ファイル
          list.push(
            <Menu.Item name='inbox' key={ file.id } data-id={ file.id }>
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
}

FileList.propTypes = {
  files: PropTypes.array,
};
