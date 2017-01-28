import React, { Component, PropTypes } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import AppSidebar from './appSidebar';

export default class Contents extends Component {

  render() {
    return (
      <div id='contents'>
        <Sidebar.Pushable as={Segment}>
          <AppSidebar
            visible={ this.props.menuVisible }
            showFiles={ this.props.menuShowFiles }
            selectFile={ this.props.menuSelectFile }
            openedFile={ this.props.editOpenedFile }
            currentDirIds={ this.props.menuCurrentDirIds }
            currentDirNames={ this.props.menuCurrentDirNames }
            onChangeShowFiles={ input => this.props.onChangeMenuShowFiles(input) }
            onChangeSelectFile={ input => this.props.onChangeMenuSelectFile(input) }
            onChangeOpenedFile={ input => this.props.onChangeEditOpenedFile(input) }
            onChangeCurrentDir={ (name, id) => this.props.onChangeMenuCurrentDir(name, id) }
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
  onChangeEditOpenedFile: PropTypes.func,
};
