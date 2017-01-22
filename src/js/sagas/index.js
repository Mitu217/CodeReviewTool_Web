import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import Actions from '../actions';
import Types from '../actions/types'

//import { repo }from '../selectors/input';

/*
export function* checkTargetRepo() {
  const repoInput = yield select(repo);
}
*/

export default function* rootSaga() {
  //yield* takeEvery(Types.TARGET_REPO_CHECK, checkTargetRepo);
}
