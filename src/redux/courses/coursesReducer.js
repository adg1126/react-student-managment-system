import _ from 'lodash';
import {
  FETCH_COURSES_START,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_FAILURE,
  SET_COURSE_TO_UPDATE
} from './coursesActionTypes';

const INITIAL_STATE = {
  courseList: [],
  courseToUpdate: null,
  isFetching: false,
  errMessage: '',
  status: {
    success: '',
    err: ''
  }
};

const coursesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSES_START:
      return { ...state, isFetching: true };
    case FETCH_COURSES_SUCCESS:
      return { ...state, isFetching: false, courseList: action.payload };
    case FETCH_COURSES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errMessage: action.payload
      };
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        courseList: {
          ...state.courseList,
          [action.key]: action.value
        },
        status: {
          ...state.status,
          success: 'Successfully added course'
        }
      };
    case SET_COURSE_TO_UPDATE:
      return {
        ...state,
        courseToUpdate: { ...state.courseToUpdate, ...action.payload }
      };
    case EDIT_COURSE_SUCCESS:
      return {
        ...state,
        courseList: {
          ...state.courseList,
          [action.payload.docId]: action.payload
        },
        status: {
          ...state.status,
          success: 'Successfully edited course'
        }
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courseList: _.omit(state.courseList, action.payload),
        status: {
          ...state.status,
          success: 'Successfully deleted course'
        }
      };
    case ADD_COURSE_FAILURE || EDIT_COURSE_FAILURE || DELETE_COURSE_FAILURE:
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

export default coursesReducer;
