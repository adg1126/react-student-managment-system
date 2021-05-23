import {
  takeLatest,
  takeEvery,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';
import {
  FETCH_CLASSES_START,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
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
  yield takeLatest(FETCH_CLASSES_START, fetchClassesAsync);
}

export function* addClassToFirebase({ payload: classObj }) {
  const classesRef = firestore.collection('classes');
  try {
    const snapshot = yield classesRef.get();
    if (snapshot.empty) {
      yield put({
        type: ADD_CLASS_FAILURE,
        payload: 'Failed to add class, check your internet connection.'
      });
    }
    yield classesRef.doc().set({ ...classObj });
    yield put({ type: ADD_CLASS_SUCCESS, payload: classObj });
  } catch (err) {
    yield put({ type: ADD_CLASS_FAILURE, payload: err.message });
  }
}

export function* onClassAdd() {
  yield takeLatest(ADD_CLASS_START, addClassToFirebase);
}

export function* deleteClassInFirebase({ payload: courseCode }) {
  const classToDeleteRef = firestore
    .collection('classes')
    .where('courseCode', '==', courseCode);

  try {
    const snapshot = yield classToDeleteRef.get();

    if (snapshot.empty) {
      yield put({
        type: DELETE_CLASS_FAILURE,
        payload: 'Failed to delete class, check your internet connection.'
      });
    }

    yield snapshot.forEach(doc => {
      doc.ref.delete();
    });
    yield put({ type: DELETE_CLASS_SUCCESS, payload: courseCode });
  } catch (err) {
    yield put({ type: DELETE_CLASS_FAILURE, payload: err.message });
  }
}

export function* onClassDelete() {
  yield takeLatest(DELETE_CLASS_START, deleteClassInFirebase);
}

export function* editClassInFirebase({ key: courseCode, value: classObj }) {
  const classToEditRef = firestore
    .collection('classes')
    .where('courseCode', '==', courseCode);

  try {
    const snapshot = yield classToEditRef.get();

    if (snapshot.empty) {
      yield put({
        type: EDIT_CLASS_FAILURE,
        payload: 'Failed to edit class, check your internet connection.'
      });
    }

    yield snapshot.forEach(doc => {
      doc.ref.update({ ...classObj });
    });
    yield put({ type: EDIT_CLASS_SUCCESS, payload: classObj });
  } catch (err) {
    yield put({ type: EDIT_CLASS_FAILURE, payload: err.message });
  }
}

export function* onClassEdit() {
  yield takeLatest(EDIT_CLASS_START, editClassInFirebase);
}

export function* classesSagas() {
  yield all([
    call(fetchClassesStart),
    call(onClassAdd),
    call(onClassDelete),
    call(onClassEdit)
  ]);
}
