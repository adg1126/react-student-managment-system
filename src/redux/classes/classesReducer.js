import _ from 'lodash';
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

const INITIAL_STATE = {
  classList: [],
  isFetching: false,
  status: {
    success: '',
    err: ''
  }
};

const classesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CLASSES_START:
      return { ...state, isFetching: true };
    case FETCH_CLASSES_SUCCESS:
      return { ...state, isFetching: false, classList: action.payload };
    case FETCH_CLASSES_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: {
          ...state.status,
          err: action.payload
        }
      };
    case ADD_CLASS_SUCCESS:
      return {
        ...state,
        classList: {
          ...state.classList,
          [action.payload.courseCode]: action.payload
        },
        status: {
          ...state.status,
          success: 'Successfully added class'
        }
      };
    case EDIT_CLASS_SUCCESS:
      return {
        ...state,
        classList: {
          ...state.classList,
          [action.payload.courseCode]: action.payload
        },
        successMessage: 'Successfully edited class'
      };
    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        classList: _.omit(state.classList, action.payload),
        status: {
          ...state.status,
          success: 'Successfully deleted class'
        }
      };
    case ADD_STUDENT_SUCCESS:
      return { ...state };
    case [ADD_CLASS_FAILURE, EDIT_CLASS_FAILURE, DELETE_CLASS_FAILURE]:
      return {
        ...state,
        status: {
          ...state.status,
          err: action.payload
        }
      };
    default:
      return state;
  }
};

export default classesReducer;
