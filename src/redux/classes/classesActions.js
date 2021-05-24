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

export const deleteClass = docId => ({
  type: DELETE_CLASS_START,
  payload: docId
});

export const editClass = (docId, classObj) => ({
  type: EDIT_CLASS_START,
  key: docId,
  value: classObj
});

export const addStudent = (courseCode, studentObj) => ({
  type: ADD_STUDENT,
  key: courseCode,
  value: { ...studentObj, id: randomId() }
});

export const deleteStudent = (courseCode, studentObj) => ({
  type: DELETE_STUDENT,
  key: courseCode,
  value: studentObj
});

export const editStudent = (courseCode, studentObj) => ({
  type: EDIT_STUDENT,
  key: courseCode,
  value: studentObj
});

function randomId() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
