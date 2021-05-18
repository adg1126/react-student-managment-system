import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../config/firebase';

import {
  FETCH_CLASSES_START,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE
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
