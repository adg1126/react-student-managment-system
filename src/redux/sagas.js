import { all, call } from 'redux-saga/effects';
import { classesSagas } from './classes/classSagas';

export default function* rootSaga() {
  yield all([call(classesSagas)]);
}
