import {
  takeLatest,
  takeEvery,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';
import {
  FETCH_STUDENTS_START,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT_START,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  DELETE_STUDENT_START,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  EDIT_STUDENT_START,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE
} from './studentActionTypes';
import { firestore } from '../../config/firebase';
import { convertStudentsSnapshotToMap } from './studentUtils';

export function* fetchStudentsAsync() {
  const studentsRef = firestore.collection('students');

  try {
    const snapshot = yield studentsRef.get();
    const studentsMap = yield call(convertStudentsSnapshotToMap, snapshot);

    yield put({ type: FETCH_STUDENTS_SUCCESS, payload: studentsMap });
  } catch (err) {
    yield put({ type: FETCH_STUDENTS_FAILURE, payload: err.message });
  }
}

export function* fetchStudentsStart() {
  yield takeLatest(FETCH_STUDENTS_START, fetchStudentsAsync);
}

export function* addStudentToFirebase({ payload: studentObj }) {
  const studentsRef = firestore.collection('students');

  try {
    const snapshot = yield studentsRef.get();
    if (snapshot.empty) {
      yield put({
        type: ADD_STUDENT_FAILURE,
        payload: 'Failed to add student, check your internet connection.'
      });
    }

    yield studentsRef.doc().set({ ...studentObj });
    yield put({ type: ADD_STUDENT_SUCCESS, payload: studentObj });
  } catch (err) {
    yield put({ type: ADD_STUDENT_FAILURE, payload: err.message });
  }
}

export function* onStudentAdd() {
  yield takeLatest(ADD_STUDENT_START, addStudentToFirebase);
}

export function* studentSagas() {
  yield all([call(fetchStudentsStart), call(onStudentAdd)]);
}
