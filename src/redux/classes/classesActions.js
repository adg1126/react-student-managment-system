import {
  firestore,
  convertClassesToSnapshotToMap
} from '../../config/firebase';

import {
  FETCH_CLASSES_START,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  ADD_CLASS,
  DELETE_CLASS,
  EDIT_CLASS
} from './classesActionTypes';

export const fetchClasses = () => async dispatch => {
  const classRef = firestore.collection('classes');
  const snapshot = await classRef.get();
  dispatch({ type: FETCH_CLASSES_START });

  try {
    const classMap = convertClassesToSnapshotToMap(snapshot);
    dispatch({ type: FETCH_CLASSES_SUCCESS, payload: classMap });
  } catch (err) {
    dispatch({ type: FETCH_CLASSES_FAILURE, payload: err.message });
  }
};

export const addClass = (key, classObj) => dispatch => {
  const classRef = firestore.collection('classes');
  // classRef.add({ ...classObj });

  dispatch({ type: ADD_CLASS });
};

export const editClass = (id, formValues) => dispatch => {};

export const deleteClass = id => dispatch => {};
