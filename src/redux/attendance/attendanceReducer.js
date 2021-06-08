import {
  FETCH_ATTENDANCE_START,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAILURE,
  FETCH_ATTENDANCE_FOR_COURSE
} from './attendanceActionTypes';

const INITIAL_STATE = {
  courseList: {},
  attendanceForCourse: {},
  isFetching: false,
  errMessage: '',
  status: {
    success: '',
    err: ''
  }
};

const attendanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTENDANCE_START:
      return { ...state, isFetching: true };
    case FETCH_ATTENDANCE_SUCCESS:
      return { ...state, isFetching: false, courseList: action.payload };
    case FETCH_ATTENDANCE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errMessage: action.payload
      };
    case FETCH_ATTENDANCE_FOR_COURSE:
      return {
        ...state,
        attendanceForCourse: Object.values(state.courseList).find(course =>
          course.courseId.match(action.payload)
        )
      };
    default:
      return state;
  }
};

export default attendanceReducer;
