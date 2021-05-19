import {
  firestore,
  convertCollectionsSnapshotToMap
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
  const collectionRef = firestore.collection('classes');
  const snapshot = await collectionRef.get();
  dispatch({ type: FETCH_CLASSES_START });

  try {
    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    dispatch({ type: FETCH_CLASSES_SUCCESS, payload: collectionsMap });
  } catch (err) {
    dispatch({ type: FETCH_CLASSES_FAILURE, payload: err.message });
  }
};

export const addClass = (key, classObj) => dispatch => {
  const collectionRef = firestore.collection('classes');
  collectionRef.add({ ...classObj });

  dispatch({ type: ADD_CLASS });
};

export const editClass = (id, formValues) => dispatch => {};

export const deleteClass = id => dispatch => {};
