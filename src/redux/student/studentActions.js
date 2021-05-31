import {
  FETCH_STUDENTS_START,
  ADD_STUDENT_START,
  DELETE_STUDENT_START,
  EDIT_STUDENT_START,
  ADD_EXISTING_STUDENT_TO_COURSE,
  DELETE_STUDENT_FROM_COURSE
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

export const addExistingStudentToCourse = studentObj => ({
  type: ADD_EXISTING_STUDENT_TO_COURSE,
  payload: studentObj
});

export const deleteStudentFromCourse = studentObj => ({
  type: DELETE_STUDENT_FROM_COURSE,
  payload: studentObj
});
