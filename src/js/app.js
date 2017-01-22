import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Container from './container';
import Actions from './actions';

const store = configureStore();

class App extends Component {
  componentWillMount() {
    const { dispatch } = store;
    dispatch(Actions.startup());
  }

  render() {
    return (
      <Container />
    );
  }
}

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
