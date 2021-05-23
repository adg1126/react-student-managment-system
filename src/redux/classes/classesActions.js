import {
  FETCH_CLASSES_START,
  ADD_CLASS_START,
  DELETE_CLASS_START,
  EDIT_CLASS_START,
  ADD_STUDENT,
  DELETE_STUDENT,
  EDIT_STUDENT
} from './classesActionTypes';

export const fetchClassesStart = () => ({
  type: FETCH_CLASSES_START
});

export const addClass = classObj => ({
  type: ADD_CLASS_START,
  payload: classObj
});

export const deleteClass = courseCode => ({
  type: DELETE_CLASS_START,
  payload: courseCode
});

export const editClass = (courseCode, classObj) => ({
  type: EDIT_CLASS_START,
  key: courseCode,
  value: classObj
});

export const addStudent = (courseCode, studentObj) => ({
  type: ADD_STUDENT,
  key: courseCode,
  value: studentObj
});

export const deleteStudent = (courseCode, studentObj) => ({
  type: DELETE_STUDENT,
  key: courseCode,
  value: studentObj
});
