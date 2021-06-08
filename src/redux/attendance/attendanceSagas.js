import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { FETCH_ATTENDANCE_START } from './attendanceActionTypes';
import {
  fetchAttendanceSuccesss,
  fetchAttendanceFailure
} from './attendanceActions';
import { firestore } from '../../config/firebase';
import { convertAttendanceSnapshotToMap } from './attendanceUtils';
import { selectCurrentUser } from '../user/userSelectors';

export function* fetchAttendanceAsync() {
  const currentUser = yield select(selectCurrentUser);
  const AttendanceRef = firestore
    .collection('attendance')
    .where('userId', '==', currentUser.id);

  try {
    const snapshot = yield AttendanceRef.get();

    if (snapshot.empty) {
      yield put(
        fetchAttendanceFailure(
          'Failed to fetch attendance, check your internet connection.'
        )
      );
    }

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

export function* attendanceSagas() {
  yield all([call(fetchAttendanceStart)]);
}
