import React, { Component, PropTypes } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export default class AppLoading extends Component {
  render() {
    return (
      <Loader active inline='centered' size='massive' />
    );
  }
}
