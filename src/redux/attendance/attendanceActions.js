import {
  FETCH_ATTENDANCE_START,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAILURE,
  SET_CURRENT_COURSE,
  SET_CURRENT_DATE,
  ADD_COURSE_ATTENDANCE_SUCCESS,
  DELETE_COURSE_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_STUDENT_ATTENDANCE_STATUS_START,
  UPDATE_STUDENT_ATTENDANCE_STATUS_SUCCESS,
  UPDATE_STUDENT_ATTENDANCE_STATUS_FAILURE
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

export const setCurrentCourse = courseCode => ({
  type: SET_CURRENT_COURSE,
  payload: courseCode
});

export const setCurrentDate = dateObj => ({
  type: SET_CURRENT_DATE,
  payload: dateObj
});

export const addCourseAttendanceSuccess = () => ({
  type: ADD_COURSE_ATTENDANCE_SUCCESS
});

export const deleteCourseAttendanceSuccess = () => ({
  type: DELETE_COURSE_ATTENDANCE_SUCCESS
});

export const updateAttendanceSuccess = (courseId, classDates) => ({
  type: UPDATE_ATTENDANCE_SUCCESS,
  key: courseId,
  value: classDates
});

export const updateStudentAttendanceStatusStart = (
  courseDocId,
  studentsMap
) => ({
  type: UPDATE_STUDENT_ATTENDANCE_STATUS_START,
  key: courseDocId,
  value: studentsMap
});

export const updateStudentAttendanceStatusSuccess = msg => ({
  type: UPDATE_STUDENT_ATTENDANCE_STATUS_SUCCESS,
  payload: msg
});

export const updateStudentAttendanceStatusFailure = errMsg => ({
  type: UPDATE_STUDENT_ATTENDANCE_STATUS_FAILURE
});
