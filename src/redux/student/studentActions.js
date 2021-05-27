import {
  FETCH_STUDENTS_START,
  ADD_STUDENT_START,
  DELETE_STUDENT_START,
  EDIT_STUDENT_START
} from './studentActionTypes';

export const fetchStudentsStart = () => ({
  type: FETCH_STUDENTS_START
});

export const addStudent = studentObj => ({
  type: ADD_STUDENT_START,
  payload: studentObj
});

export const deleteStudent = docId => ({
  type: DELETE_STUDENT_START,
  payload: docId
});

export const editStudent = (docId, studentObj) => ({
  type: EDIT_STUDENT_START,
  key: docId,
  value: studentObj
});
