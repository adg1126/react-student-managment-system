import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import _ from 'lodash';
import history from '../../history';
import {
  FETCH_COURSES_START,
  ADD_COURSE_START,
  DELETE_COURSE_START,
  EDIT_COURSE_START
} from './coursesActionTypes';
import {
  fetchCoursesSuccesss,
  fetchCoursesFailure,
  addCourseSuccess,
  addCourseFailure,
  deleteCourseSuccess,
  deleteCourseFailure,
  editCourseSuccess,
  editCourseFailure
} from './coursesActions';
import { firestore } from '../../config/firebase';
import firebase from 'firebase/app';
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
      yield put(
        fetchCoursesFailure(
          'Failed to fetch courses, check your internet connection.'
        )
      );
    }

    const coursesRefMap = yield call(convertCoursesSnapshotToMap, snapshot);
    yield put(fetchCoursesSuccesss(coursesRefMap));
  } catch (err) {
    yield put(fetchCoursesFailure(err.message));
  }
}

export function* fetchCoursesStart() {
  yield takeLatest(FETCH_COURSES_START, fetchCoursesAsync);
}

export function* addCourseToFirebase({ payload: courseData }) {
  const coursesRef = firestore.collection('courses');
  const attendanceRef = firestore.collection('attendance');
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const snapshot = yield coursesRef.get() && attendanceRef.get();
      if (snapshot.empty) {
        yield put(
          addCourseFailure(
            'Failed to add course, check your internet connection.'
          )
        );
      }

      const courseDocRef = yield coursesRef.add({
        ...courseData,
        userId: currentUser.id
      });

      yield put(
        addCourseSuccess(courseDocRef.id, {
          userId: currentUser.id,
          docId: courseDocRef.id,
          ...courseData
        })
      );
    } catch (err) {
      yield put(addCourseFailure(err.message));
    }
  }
}

export function* onCourseAdd() {
  yield takeLatest(ADD_COURSE_START, addCourseToFirebase);
}

export function* deleteCourseInFirebase({ payload: courseDocId }) {
  const courseToDeleteRef = firestore.collection('courses').doc(courseDocId);
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const courseToDeleteSnapshot = yield courseToDeleteRef.get();
      const studentsWithCourseRef = yield firestore
        .collection('students')
        .where('courses', 'array-contains', courseDocId);

      if (courseToDeleteSnapshot.empty) {
        yield put(
          deleteCourseFailure(
            'Failed to delete course, check your internet connection.'
          )
        );
      }

      try {
        const studentsWithCourseSnapshot = yield studentsWithCourseRef.get();

        if (studentsWithCourseSnapshot.empty) {
          yield put(
            deleteCourseFailure(
              'Failed to delete course, check your internet connection.'
            )
          );
        }

        yield studentsWithCourseSnapshot.forEach(doc => {
          doc.ref.update({
            courses: firebase.firestore.FieldValue.arrayRemove(courseDocId)
          });
        });
        history.push('/courses');
      } catch (err) {
        yield put(deleteCourseFailure(err.message));
      }

      yield courseToDeleteRef.delete();
      yield put(deleteCourseSuccess(courseDocId));
    } catch (err) {
      yield put(deleteCourseFailure(err.message));
    }
  }
}

export function* onCourseDelete() {
  yield takeLatest(DELETE_COURSE_START, deleteCourseInFirebase);
}

export function* editCourseInFirebase({ key: courseDocId, value: courseData }) {
  const courseToEditRef = firestore.collection('courses').doc(courseDocId);
  const currentUser = yield select(selectCurrentUser);

  if (currentUser) {
    try {
      const snapshot = yield courseToEditRef.get();

      if (snapshot.empty) {
        yield put(
          editCourseFailure(
            'Failed to edit course, check your internet connection.'
          )
        );
      }

      yield courseToEditRef.update(_.omit(courseData, 'docId'));
      yield put(editCourseSuccess(courseData));
      history.push('/courses');
    } catch (err) {
      yield put(editCourseFailure(err.message));
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
