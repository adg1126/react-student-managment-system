import {
  FETCH_ATTENDANCE_START,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAILURE
} from './attendanceActionTypes';

export const fetchAttendanceStart = () => ({
  type: FETCH_ATTENDANCE_START
});

export const fetchAttendanceSuccesss = attendanceMap => ({
  type: FETCH_ATTENDANCE_SUCCESS,
  payload: attendanceMap
});

export const fetchAttendanceFailure = errMsg => ({
  type: FETCH_ATTENDANCE_FAILURE,
  payload: errMsg
});