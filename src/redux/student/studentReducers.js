import {
  FETCH_STUDENTS_START,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT_START,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,
  DELETE_STUDENT_START,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  EDIT_STUDENT_START,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE
} from './studentActionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
  isFetching: false,
  studentList: [],
  status: {
    success: '',
    err: ''
  }
};

const studentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_START:
      return { ...state, isFetching: true };
    case FETCH_STUDENTS_SUCCESS:
      return { ...state, isFetching: false, studentList: action.payload };
    case FETCH_STUDENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        status: {
          ...state.status,
          err: action.payload
        }
      };
    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        studentList: {
          ...state.studentList,
          [action.payload.docId]: action.payload
        },
        status: {
          ...state.status,
          success: 'Successfully added class'
        }
      };
    // return {
    //   ...state,
    //   studentList: {
    //     ...state.studentList,
    //     [action.payload.courseCode]: action.payload
    //   },
    //   status: {
    //     ...state.status,
    //     success: 'Successfully added class'
    //   }
    // };
    case EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        studentList: {
          ...state.studentList,
          [action.payload.docId]: action.payload
        },
        successMessage: 'Successfully edited class'
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        studentList: _.omit(state.studentList, action.payload),
        status: {
          ...state.status,
          success: 'Successfully deleted class'
        }
      };
    case [ADD_STUDENT_FAILURE, EDIT_STUDENT_FAILURE, DELETE_STUDENT_FAILURE]:
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

export default studentReducer;
