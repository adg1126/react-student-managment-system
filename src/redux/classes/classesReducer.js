import {
  FETCH_CLASSES_START,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  ADD_CLASS,
  DELETE_CLASS,
  EDIT_CLASS
} from './classesActionTypes';

const INITIAL_STATE = {
  classList: null,
  isFetching: false,
  errMeassage: ''
};

const classesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CLASSES_START:
      return { ...state, isFetching: true };
    case FETCH_CLASSES_SUCCESS:
      return { ...state, isFetching: false, classList: action.payload };
    case FETCH_CLASSES_FAILURE:
      return { ...state, isFetching: false, errMeassage: action.payload };
    case ADD_CLASS:
      return {
        ...state.classList
      };
    default:
      return state;
  }
};

export default classesReducer;
