import _ from 'lodash';
import {
  FETCH_CLASSES_START,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
  ADD_CLASS,
  DELETE_CLASS,
  EDIT_CLASS
} from './classesActionTypes';

const INITIAL_STATE = {
  classList: [],
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
        ...state,
        classList: {
          ...state.classList,
          [action.payload.courseCode]: action.payload
        }
      };
    case DELETE_CLASS:
      return { ...state, classList: _.omit(state.classList, action.payload) };
    default:
      return state;
  }
};

export default classesReducer;
