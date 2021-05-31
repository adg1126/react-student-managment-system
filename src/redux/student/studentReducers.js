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
  EDIT_STUDENT_FAILURE,
  ADD_EXISTING_STUDENT_TO_COURSE,
  DELETE_STUDENT_FROM_COURSE
} from './studentActionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
  studentList: [],
  isFetching: false,
  errMessage: '',
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
        errMessage: action.payload
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
          success: 'Successfully added student'
        }
      };
    case EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        studentList: {
          ...state.studentList,
          [action.payload.docId]: action.payload
        },
        successMessage: 'Successfully edited student'
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        studentList: _.omit(state.studentList, action.payload),
        status: {
          ...state.status,
          success: 'Successfully removed student'
        }
      };
    case ADD_STUDENT_FAILURE || EDIT_STUDENT_FAILURE || DELETE_STUDENT_FAILURE:
      return {
        ...state,
        status: {
          ...state.status,
          err: action.payload
        }
      };
    case ADD_EXISTING_STUDENT_TO_COURSE:
      return {
        ...state,
        studentList: {
          ...state.studentList,
          [action.payload.docId]: {
            ...state.studentList[action.payload.docId],
            courses: [
              ...state.studentList[action.payload.docId].courses,
              action.payload.courseToAdd
            ]
          }
        },
        status: {
          ...state.status,
          success: 'Successfully added student to course'
        }
      };
    case DELETE_STUDENT_FROM_COURSE:
      return {
        ...state,
        studentList: {
          ...state.studentList,
          [action.payload.docId]: {
            ...state.studentList[action.payload.docId],
            courses: _.without(
              state.studentList[action.payload.docId].courses,
              action.payload.courseToDelete
            )
          }
        },
        status: {
          ...state.status,
          success: 'Successfully deleted student from course'
        }
      };
    default:
      return state;
  }
};

export default studentReducer;
