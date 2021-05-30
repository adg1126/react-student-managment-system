import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import history from '../../history';
import {
  FETCH_COURSES_START,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  ADD_COURSE_START,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  DELETE_COURSE_START,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  EDIT_COURSE_START,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_FAILURE
} from './coursesActionTypes';
import { firestore } from '../../config/firebase';
import { convertCoursesSnapshotToMap } from './coursesUtils';
import { selectCurrentUser } from '../user/userSelectors';

export function* fetchCoursesAsync() {
  const currentUser = yield select(selectCurrentUser);
  const coursesRef = firestore
    .collection('courses')
    .where('userId', '==', currentUser.id);

  try {
    const snapshot = yield coursesRef.get();

    if (snapshot.empty) {
      yield put({
        type: FETCH_COURSES_FAILURE,
        payload: 'Failed to fetch courses, check your internet connection.'
      });
    }

    const coursesRefMap = yield call(convertCoursesSnapshotToMap, snapshot);
    yield put({ type: FETCH_COURSES_SUCCESS, payload: coursesRefMap });
  } catch (err) {
    yield put({ type: FETCH_COURSES_FAILURE, payload: err.message });
  }
}

export function* fetchCoursesStart() {
  yield takeLatest(FETCH_COURSES_START, fetchCoursesAsync);
}

export function* addCourseToFirebase({ payload: course }) {
  const coursesRef = firestore.collection('courses');
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const snapshot = yield coursesRef.get();
      if (snapshot.empty) {
        yield put({
          type: ADD_COURSE_FAILURE,
          payload: 'Failed to add course, check your internet connection.'
        });
      }

      const courseDocRef = yield coursesRef.add({
        ...course,
        userId: currentUser.id
      });
      yield put({
        type: ADD_COURSE_SUCCESS,
        key: courseDocRef.id,
        value: { userId: currentUser.id, ...course }
      });
    } catch (err) {
      yield put({ type: ADD_COURSE_FAILURE, payload: err.message });
    }
  }
}

export function* onCourseAdd() {
  yield takeLatest(ADD_COURSE_START, addCourseToFirebase);
}

export function* deleteCourseInFirebase({ payload: docId }) {
  const courseToDeleteRef = firestore.collection('courses').doc(docId);
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const snapshot = yield courseToDeleteRef.get();

      if (snapshot.empty) {
        yield put({
          type: DELETE_COURSE_FAILURE,
          payload: 'Failed to delete course, check your internet connection.'
        });
      }

      yield courseToDeleteRef.delete();
      yield put({ type: DELETE_COURSE_SUCCESS, payload: docId });
    } catch (err) {
      yield put({ type: DELETE_COURSE_FAILURE, payload: err.message });
    }
  }
}

export function* onCourseDelete() {
  yield takeLatest(DELETE_COURSE_START, deleteCourseInFirebase);
}

export function* editCourseInFirebase({ key: docId, value: course }) {
  const courseToEditRef = firestore.collection('courses').doc(docId);
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const snapshot = yield courseToEditRef.get();

      if (snapshot.empty) {
        yield put({
          type: EDIT_COURSE_FAILURE,
          payload: 'Failed to edit course, check your internet connection.'
        });
      }

      yield courseToEditRef.update({ ...course });
      yield put({ type: EDIT_COURSE_SUCCESS, payload: course });
      history.push('/courses');
    } catch (err) {
      yield put({ type: EDIT_COURSE_FAILURE, payload: err.message });
    }
  }
}

export function* onCourseEdit() {
  yield takeLatest(EDIT_COURSE_START, editCourseInFirebase);
}

export function* coursesSagas() {
  yield all([
    call(fetchCoursesStart),
    call(onCourseAdd),
    call(onCourseDelete),
    call(onCourseEdit)
  ]);
}
