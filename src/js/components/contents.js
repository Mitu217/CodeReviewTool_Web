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
            onChangeShowFiles={ input => this.props.onChangeMenuShowFiles(input) }
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
  onChangeMenuShowFiles: PropTypes.func,
};
