import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { FETCH_ATTENDANCE_START } from './attendanceActionTypes';
import {
  FETCH_COURSES_SUCCESS,
  ADD_COURSE_SUCCESS,
  EDIT_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS
} from '../courses/coursesActionTypes';
import {
  fetchAttendanceSuccesss,
  fetchAttendanceFailure
} from './attendanceActions';
import { firestore } from '../../config/firebase';
import { convertAttendanceSnapshotToMap } from './attendanceUtils';
import { getClassDates } from './attendanceUtils';
import { selectCurrentUser } from '../user/userSelectors';
import { selectCourseListForPreview } from '../courses/coursesSelectors';

export function* fetchAttendanceAsync() {
  const currentUser = yield select(selectCurrentUser);
  const AttendanceRef = firestore
    .collection('attendance')
    .where('userId', '==', currentUser.id);

  try {
    const snapshot = yield AttendanceRef.get();
    const AttendanceRefMap = yield call(
      convertAttendanceSnapshotToMap,
      snapshot
    );
    yield put(fetchAttendanceSuccesss(AttendanceRefMap));
  } catch (err) {
    yield put(fetchAttendanceFailure(err.message));
  }
}

export function* fetchAttendanceStart() {
  yield takeLatest(FETCH_ATTENDANCE_START, fetchAttendanceAsync);
}

export function* updateAttendanceInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  const attendanceRef = firestore.collection('attendance');

  if (currentUser) {
    const courseList = yield select(selectCourseListForPreview);
    yield courseList.forEach(async course => {
      const {
        docId,
        courseDates: { startDate, endDate },
        daysMeetAndTime,
        courseCode
      } = course;

      let courseAttendanceSnapshot = await attendanceRef
        .where('courseId', '==', docId)
        .get();

      courseAttendanceSnapshot.empty
        ? await attendanceRef.add({
            classDates: [
              ...getClassDates(startDate, endDate, daysMeetAndTime, courseCode)
            ],
            userId: currentUser.id,
            courseId: docId
          })
        : courseAttendanceSnapshot.forEach(async doc => {
            await doc.ref.update({
              classDates: [
                ...getClassDates(
                  startDate,
                  endDate,
                  daysMeetAndTime,
                  courseCode
                )
              ]
            });
          });
    });
  }
}

export function* onUpdateAttendanceInFireBase() {
  yield takeLatest(
    [FETCH_COURSES_SUCCESS, ADD_COURSE_SUCCESS, EDIT_COURSE_SUCCESS],
    updateAttendanceInFirebase
  );
}

export function* attendanceSagas() {
  yield all([call(fetchAttendanceStart), call(onUpdateAttendanceInFireBase)]);
}
