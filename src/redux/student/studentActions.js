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
  ADD_EXISTING_STUDENT_TO_COURSE,
  DELETE_STUDENT_FROM_COURSE,
  EDIT_STUDENT
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

export const addStudent = studentData => ({
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

export const deleteStudent = studentDocId => ({
  type: DELETE_STUDENT_START,
  payload: studentDocId
});

export const deleteStudentSuccess = studentDocId => ({
  type: DELETE_STUDENT_SUCCESS,
  payload: studentDocId
});

export const deleteStudentFailure = err => ({
  type: DELETE_STUDENT_FAILURE,
  payload: err
});

export const setStudentToUpdate = studentData => ({
  type: SET_STUDENT_TO_UPDATE,
  payload: studentData
});

export const addExistingStudentToCourse = (studentDocId, courseDocId) => ({
  type: ADD_EXISTING_STUDENT_TO_COURSE,
  key: studentDocId,
  value: courseDocId
});

export const deleteStudentFromCourse = (studentDocId, courseDocId) => ({
  type: DELETE_STUDENT_FROM_COURSE,
  key: studentDocId,
  value: courseDocId
});

export const editStudent = (studentDocId, studentData) => ({
  type: EDIT_STUDENT,
  key: studentDocId,
  value: studentData
});
