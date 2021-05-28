import { all, call } from 'redux-saga/effects';
import { coursesSagas } from './courses/coursesSagas';
import { userSagas } from './user/userSagas';
import { studentSagas } from './student/studentSagas';

export default function* rootSaga() {
  yield all([call(coursesSagas), call(userSagas), call(studentSagas)]);
}
