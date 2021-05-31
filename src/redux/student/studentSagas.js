import { takeLatest, call, put, all, select } from 'redux-saga/effects';
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
  EDIT_STUDENT_FAILURE,
  ADD_EXISTING_STUDENT_TO_COURSE,
  DELETE_STUDENT_FROM_COURSE
} from './studentActionTypes';
import { firestore } from '../../config/firebase';
import { convertStudentsSnapshotToMap } from './studentUtils';
import { selectCurrentUser } from '../user/userSelectors';
import { selectStudentCourses } from './studentSelectors';

export function* fetchStudentsAsync() {
  const currentUser = yield select(selectCurrentUser);
  const studentsRef = firestore
    .collection('students')
    .where('userId', '==', currentUser.id);

  try {
    const snapshot = yield studentsRef.get();

    if (snapshot.empty) {
      yield put({
        type: FETCH_STUDENTS_FAILURE,
        payload: 'Failed to fetch students, check your internet connection.'
      });
    }

    const studentsMap = yield call(convertStudentsSnapshotToMap, snapshot);

    yield put({ type: FETCH_STUDENTS_SUCCESS, payload: studentsMap });
  } catch (err) {
    yield put({ type: FETCH_STUDENTS_FAILURE, payload: err.message });
  }
}

export function* fetchStudentsStart() {
  yield takeLatest(FETCH_STUDENTS_START, fetchStudentsAsync);
}

export function* addStudentToFirebase({ payload: student }) {
  const currentUser = yield select(selectCurrentUser);
  const studentsRef = firestore.collection('students');

  if (currentUser) {
    try {
      const snapshot = yield studentsRef.get();
      if (snapshot.empty) {
        yield put({
          type: ADD_STUDENT_FAILURE,
          payload: 'Failed to add student, check your internet connection.'
        });
      }

      const studentDocRef = yield studentsRef.add({
        ...student,
        userId: currentUser.id
      });
      yield put({
        type: ADD_STUDENT_SUCCESS,
        payload: { userId: currentUser.id, docId: studentDocRef.id, ...student }
      });
    } catch (err) {
      yield put({ type: ADD_STUDENT_FAILURE, payload: err.message });
    }
  }
}

export function* onStudentAdd() {
  yield takeLatest(ADD_STUDENT_START, addStudentToFirebase);
}

export function* updateStudentInFirebase({ payload: studentObj }) {
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const studentRef = yield firestore
        .collection('students')
        .doc(studentObj.docId);
      const studentCourses = yield select(
        selectStudentCourses(studentObj.docId)
      );

      yield studentRef.update({ courses: studentCourses });
    } catch (err) {
      console.log(err);
    }
  }
}

export function* onStudentChange() {
  yield takeLatest(
    [ADD_EXISTING_STUDENT_TO_COURSE, DELETE_STUDENT_FROM_COURSE],
    updateStudentInFirebase
  );
}

export function* studentSagas() {
  yield all([
    call(fetchStudentsStart),
    call(onStudentAdd),
    call(onStudentChange)
  ]);
}
