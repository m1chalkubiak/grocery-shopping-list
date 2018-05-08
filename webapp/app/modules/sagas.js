import { all, fork } from 'redux-saga/effects';
import listsSaga from './lists/lists.sagas';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    fork(listsSaga),
    //<-- INJECT MODULE SAGA -->
  ]);
}
