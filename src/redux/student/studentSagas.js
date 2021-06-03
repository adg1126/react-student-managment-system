import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import {
  FETCH_STUDENTS_START,
  ADD_STUDENT_START,
  DELETE_STUDENT_START,
  EDIT_STUDENT,
  ADD_EXISTING_STUDENT_TO_COURSE,
  DELETE_STUDENT_FROM_COURSE
} from './studentActionTypes';
import {
  fetchStudentsSuccess,
  fetchStudentsFailure,
  addStudentSuccess,
  addStudentFailure,
  deleteStudentSuccess,
  deleteStudentFailure
} from './studentActions';
import { firestore } from '../../config/firebase';
import { convertStudentsSnapshotToMap } from './studentUtils';
import { selectCurrentUser } from '../user/userSelectors';
import { selectStudent } from './studentSelectors';

export function* fetchStudentsAsync() {
  const currentUser = yield select(selectCurrentUser);
  const studentsRef = firestore
    .collection('students')
    .where('userId', '==', currentUser.id);

  try {
    const snapshot = yield studentsRef.get();

    if (snapshot.empty) {
      yield put(
        fetchStudentsFailure(
          'Failed to fetch students, check your internet connection.'
        )
      );
    }

    const studentsMap = yield call(convertStudentsSnapshotToMap, snapshot);
    yield put(fetchStudentsSuccess(studentsMap));
  } catch (err) {
    yield put(fetchStudentsFailure(err.message));
  }
}

export function* fetchStudentsStart() {
  yield takeLatest(FETCH_STUDENTS_START, fetchStudentsAsync);
}

export function* addStudentToFirebase({ payload: studentData }) {
  const currentUser = yield select(selectCurrentUser);
  const studentsRef = firestore.collection('students');

  if (currentUser) {
    try {
      const snapshot = yield studentsRef.get();
      if (snapshot.empty) {
        yield put(
          addStudentFailure(
            'Failed to add student, check your internet connection.'
          )
        );
      }

      const studentDocRef = yield studentsRef.add({
        ...studentData,
        userId: currentUser.id
      });
      yield put(
        addStudentSuccess({
          userId: currentUser.id,
          docId: studentDocRef.id,
          ...studentData
        })
      );
    } catch (err) {
      yield put(addStudentFailure(err.message));
    }
  }
}

export function* onStudentAdd() {
  yield takeLatest(ADD_STUDENT_START, addStudentToFirebase);
}

export function* deleteStudentInFirebase({ payload: studentDocId }) {
  const currentUser = yield select(selectCurrentUser);
  const studentToDeleteRef = firestore.collection('students').doc(studentDocId);

  if (currentUser) {
    try {
      const snapshot = yield studentToDeleteRef.get();
      if (snapshot.empty) {
        yield put(
          deleteStudentFailure(
            'Failed to delete student, check your internet connection.'
          )
        );
      }

      yield studentToDeleteRef.delete();
      yield put(deleteStudentSuccess(studentDocId));
    } catch (err) {
      yield put(deleteStudentFailure(err.message));
    }
  }
}

export function* onStudentDelete() {
  yield takeLatest(DELETE_STUDENT_START, deleteStudentInFirebase);
}

export function* updateStudentInFirebase({ key: studentDocId }) {
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const studentRef = yield firestore
        .collection('students')
        .doc(studentDocId);
      const student = yield select(selectStudent(studentDocId));

      yield studentRef.update(_.omit(student, 'docId'));
    } catch (err) {
      console.log(err);
    }
  }
}

export function* onStudentChange() {
  yield takeLatest(
    [ADD_EXISTING_STUDENT_TO_COURSE, DELETE_STUDENT_FROM_COURSE, EDIT_STUDENT],
    updateStudentInFirebase
  );
}

export function* studentSagas() {
  yield all([
    call(fetchStudentsStart),
    call(onStudentAdd),
    call(onStudentDelete),
    call(onStudentChange)
  ]);
}
