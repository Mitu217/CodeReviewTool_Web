import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default (initialState) => {

  const sagaMiddleware = createSagaMiddleware();

  // storeの生成
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      sagaMiddleware,
      logger()
    )
  );

  // sagaの起動
  sagaMiddleware.run(rootSaga);

  return store;

}
