import { firestore } from '../../config/firebase';

import {
  FETCH_CLASSES_START,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  ADD_CLASS,
  DELETE_CLASS,
  EDIT_CLASS
} from './classesActionTypes';

import { convertClassesToSnapshotToMap } from './cartUtils';

export const fetchClasses = () => async dispatch => {
  dispatch({ type: FETCH_CLASSES_START });

  try {
    const classesRef = firestore.collection('classes');
    const snapshot = await classesRef.get();
    const clasessArr = convertClassesToSnapshotToMap(snapshot);
    dispatch({ type: FETCH_CLASSES_SUCCESS, payload: clasessArr });
  } catch (err) {
    dispatch({ type: FETCH_CLASSES_FAILURE, payload: err.message });
  }
};

export const addClass = (uid, classObj) => async dispatch => {
  try {
    const classesRef = firestore.collection('classes');
    const classToAdd = classesRef.doc(uid).set({ ...classObj });
    await classToAdd;
    dispatch({ type: ADD_CLASS, payload: classObj });
  } catch (err) {
    console.log(err.message);
  }
};

export const editClass = courseCode => dispatch => {};

export const deleteClass = courseCode => async dispatch => {
  try {
    const classesRef = firestore.collection('classes');
    const classToDeleteDoc = classesRef.doc(courseCode);
    await classToDeleteDoc.delete();
    dispatch({ type: DELETE_CLASS, payload: courseCode });
  } catch (err) {
    console.log(err.message);
  }
};
