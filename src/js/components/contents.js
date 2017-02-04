import React, { Component, PropTypes } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import AppSidebar from './appSidebar';
import Edit from './edit';

export default class Contents extends Component {

  render() {
    const openedFile = this.props.editOpenedFile;
    return (
      <div id='contents'>
        <Sidebar.Pushable as={Segment}>
          <AppSidebar
            visible={ this.props.menuVisible }
            showFiles={ this.props.menuShowFiles }
            selectFile={ this.props.menuSelectFile }
            currentDirIds={ this.props.menuCurrentDirIds }
            currentDirNames={ this.props.menuCurrentDirNames }
            openedFile={ this.props.editOpenedFile }
            onChangeShowFiles={ input => this.props.onChangeMenuShowFiles(input) }
            onChangeSelectFile={ input => this.props.onChangeMenuSelectFile(input) }
            onChangeCurrentDir={ (name, id) => this.props.onChangeMenuCurrentDir(name, id) }
            onChangeOpenedFile={ input => this.props.onChangeEditOpenedFile(input) }
            onChangeModalVisible={ input => this.props.onChangeModalVisible(input) }
          />
          <Sidebar.Pusher>
            <Edit
              openedFile={ this.props.editOpenedFile }
              outputDiff={ this.props.editOutputDiff }
              outputComments={ this.props.editOutputComments }
              onChangeOutputDiff={ input => this.props.onChangeEditOutputDiff(input) }
              onChangeOutputComments={ input => this.props.onChangeEditOutputComments(input) }
            />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

Contents.propTypes = {
  menuVisible: PropTypes.bool,
  menuShowFiles: PropTypes.array,
  menuSelectFile: PropTypes.string,
  menuCurrentDirIds: PropTypes.array,
  menuCurrentDirNames: PropTypes.array,
  onChangeMenuShowFiles: PropTypes.func,
  onChangeMenuSelectFile: PropTypes.func,
  onChangeMenuCurrentDir: PropTypes.func,

  editOpenedFile: PropTypes.string,
  editOutputDiff: PropTypes.string,
  editOutputComments: PropTypes.string,
  onChangeEditOpenedFile: PropTypes.func,
  onChangeEditOutputDiff: PropTypes.func,
  onChangeEditOutputComments: PropTypes.func,

  onChangeModalVisible: PropTypes.func,
};
