import { firestore } from '../../config/firebase';

import {
  FETCH_CLASSES_START,
  ADD_CLASS_START,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAILURE,
  DELETE_CLASS_START,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAILURE,
  EDIT_CLASS_START,
  EDIT_CLASS_SUCCESS,
  EDIT_CLASS_FAILURE,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE
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

// Student
export const addStudent = (courseCode, studentObj) => async dispatch => {};
