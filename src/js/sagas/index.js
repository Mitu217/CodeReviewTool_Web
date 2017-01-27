import { fork } from 'redux-saga/effects';
import Startup from './startup';

export default function* rootSaga() {
  yield fork(Startup);
}
