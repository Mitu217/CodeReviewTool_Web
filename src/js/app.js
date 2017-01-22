import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Main from './container/main';
import Actions from './actions';

const store = configureStore();

class App extends Component {
  componentWillMount() {
    const { dispatch } = store;

    // 起動時設定
    dispatch(Actions.startup());
  }

  render() {
    return (
      <Main />
    );
  }
}

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
