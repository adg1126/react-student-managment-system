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
  SET_STUDENT_TO_UPDATE,
  ADD_EXISTING_STUDENT_TO_COURSE_START,
  ADD_EXISTING_STUDENT_TO_COURSE_SUCCESS,
  ADD_EXISTING_STUDENT_TO_COURSE_FAILURE,
  DELETE_STUDENT_FROM_COURSE_START,
  DELETE_STUDENT_FROM_COURSE_SUCCESS,
  DELETE_STUDENT_FROM_COURSE_FAILURE,
  EDIT_STUDENT_START,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE
} from './studentActionTypes';

export const fetchStudentsStart = () => ({
  type: FETCH_STUDENTS_START
});

export const fetchStudentsSuccess = studentsMap => ({
  type: FETCH_STUDENTS_SUCCESS,
  payload: studentsMap
});

export const fetchStudentsFailure = errMsg => ({
  type: FETCH_STUDENTS_FAILURE,
  payload: errMsg
});

export const addStudentStart = studentData => ({
  type: ADD_STUDENT_START,
  payload: studentData
});

export const addStudentSuccess = studentData => ({
  type: ADD_STUDENT_SUCCESS,
  payload: studentData
});

export const addStudentFailure = errMsg => ({
  type: ADD_STUDENT_FAILURE,
  payload: errMsg
});

export const deleteStudentStart = studentDocId => ({
  type: DELETE_STUDENT_START,
  payload: studentDocId
});

export const deleteStudentSuccess = studentDocId => ({
  type: DELETE_STUDENT_SUCCESS,
  payload: studentDocId
});

export const deleteStudentFailure = errMsg => ({
  type: DELETE_STUDENT_FAILURE,
  payload: errMsg
});

export const setStudentToUpdate = studentData => ({
  type: SET_STUDENT_TO_UPDATE,
  payload: studentData
});

export const addExistingStudentToCourseStart = (studentDocId, courseDocId) => ({
  type: ADD_EXISTING_STUDENT_TO_COURSE_START,
  key: studentDocId,
  value: courseDocId
});

export const addExistingStudentToCourseSuccess = msg => ({
  type: ADD_EXISTING_STUDENT_TO_COURSE_SUCCESS,
  payload: msg
});

export const addExistingStudentToCourseFailure = errMsg => ({
  type: ADD_EXISTING_STUDENT_TO_COURSE_FAILURE,
  payload: errMsg
});

export const deleteStudentFromCourseStart = (studentDocId, courseDocId) => ({
  type: DELETE_STUDENT_FROM_COURSE_START,
  key: studentDocId,
  value: courseDocId
});

export const deleteStudentFromCourseSuccess = msg => ({
  type: DELETE_STUDENT_FROM_COURSE_SUCCESS,
  payload: msg
});

export const deleteStudentFromCourseFailure = errMsg => ({
  type: DELETE_STUDENT_FROM_COURSE_FAILURE,
  payload: errMsg
});

export const editStudentStart = (studentDocId, studentData) => ({
  type: EDIT_STUDENT_START,
  key: studentDocId,
  value: studentData
});

export const editStudentSuccess = msg => ({
  type: EDIT_STUDENT_SUCCESS,
  payload: msg
});

export const editStudentFailure = errMsg => ({
  type: EDIT_STUDENT_FAILURE,
  payload: errMsg
});
