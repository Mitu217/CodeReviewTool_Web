import { take } from 'redux-saga/effects';
import Types from '../actions/types';

export default function* watcher() {
  yield take(Types.STARTUP);
}
