import { takeLatest, takeEvery, call, put, all } from 'redux-saga/effects';
import {
  FETCH_CLASSES_START,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_FAILURE,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_FAILURE,
  EDIT_CLASS_SUCCESS,
  EDIT_CLASS_FAILURE,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE
} from './classesActionTypes';
import { firestore } from '../../config/firebase';
import { convertClassesToSnapshotToMap } from './classUtils';

export function* fetchClassesAsync() {
  const classesRef = firestore.collection('classes');

  try {
    const snapshot = yield classesRef.get();
    const classesMap = yield call(convertClassesToSnapshotToMap, snapshot);

    yield put({ type: FETCH_CLASSES_SUCCESS, payload: classesMap });
  } catch (err) {
    yield put({ type: FETCH_CLASSES_FAILURE, payload: err.message });
  }
}

export function* fetchClassesStart() {
  yield takeEvery(FETCH_CLASSES_START, fetchClassesAsync);
}

export function* classesSagas() {
  yield all([call(fetchClassesStart)]);
}
