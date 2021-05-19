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

export const addClass = classObj => dispatch => {
  const classRef = firestore.collection('classes');
  classRef.add({ ...classObj });

  try {
    dispatch({ type: ADD_CLASS, payload: classObj });
  } catch (err) {
    console.log(err.message);
  }
};

export const editClass = item => dispatch => {};

export const deleteClass = courseCode => async dispatch => {
  const classToDeleteRef = firestore
    .collection('classes')
    .where('courseCode', '==', courseCode);

  const snapshot = await classToDeleteRef.get();
  snapshot.forEach(doc => {
    doc.ref.delete();
    dispatch({ type: DELETE_CLASS });
  });
};
