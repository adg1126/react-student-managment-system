import { firestore } from '../../config/firebase';

import {
  FETCH_CLASSES_START,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAILURE,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAILURE,
  EDIT_CLASS_SUCCESS,
  EDIT_CLASS_FAILURE
} from './classesActionTypes';

import { convertClassesToSnapshotToMap } from './classUtils';

export const fetchClasses = () => async dispatch => {
  const classesRef = firestore.collection('classes');
  dispatch({ type: FETCH_CLASSES_START });

  try {
    const snapshot = await classesRef.get();
    const clasessArr = convertClassesToSnapshotToMap(snapshot);
    dispatch({ type: FETCH_CLASSES_SUCCESS, payload: clasessArr });
  } catch (err) {
    dispatch({ type: FETCH_CLASSES_FAILURE, payload: err.message });
  }
};

export const addClass = classObj => async dispatch => {
  const classesRef = firestore.collection('classes');

  try {
    const snapshot = await classesRef.get();

    if (snapshot.empty) {
      dispatch({
        type: ADD_CLASS_FAILURE,
        payload: 'Failed to add class, check your internet connection.'
      });
    }

    await classesRef.doc().set({ ...classObj });
    dispatch({ type: ADD_CLASS_SUCCESS, payload: classObj });
  } catch (err) {
    dispatch({ type: ADD_CLASS_FAILURE, payload: err.message });
  }
};

export const editClass = (courseCode, classObj) => async dispatch => {
  const classToEditRef = firestore
    .collection('classes')
    .where('courseCode', '==', courseCode);

  try {
    const snapshot = await classToEditRef.get();

    if (snapshot.empty) {
      dispatch({
        type: EDIT_CLASS_FAILURE,
        payload: 'Failed to edit class, check your internet connection.'
      });
    }

    snapshot.forEach(doc => {
      doc.ref.update({ ...classObj });
      dispatch({ type: EDIT_CLASS_SUCCESS, payload: classObj });
    });
  } catch (err) {
    dispatch({ type: EDIT_CLASS_FAILURE, payload: err.message });
  }
};

export const deleteClass = courseCode => async dispatch => {
  const classToDeleteRef = firestore
    .collection('classes')
    .where('courseCode', '==', courseCode);

  try {
    const snapshot = await classToDeleteRef.get();

    if (snapshot.empty) {
      dispatch({
        type: DELETE_CLASS_FAILURE,
        payload: 'Failed to delete class, check your internet connection.'
      });
    }

    snapshot.forEach(doc => {
      doc.ref.delete();
      dispatch({ type: DELETE_CLASS_SUCCESS, payload: courseCode });
    });
  } catch (err) {
    dispatch({ type: DELETE_CLASS_FAILURE, payload: err.message });
  }
};
