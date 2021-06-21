import {
  FETCH_ATTENDANCE_START,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAILURE,
  SET_CURRENT_COURSE,
  SET_CURRENT_DATE,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_STUDENT_ATTENDANCE_STATUS_START,
  UPDATE_STUDENT_ATTENDANCE_STATUS_SUCCESS
} from './attendanceActionTypes';
import _ from 'lodash';

const INITIAL_STATE = {
  courseList: {},
  currentCourse: {},
  currentDate: {},
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
    case SET_CURRENT_COURSE:
      return {
        ...state,
        isFetching: false,
        currentCourse: Object.values(state.courseList).find(course =>
          course.courseCode.match(action.payload)
        )
      };
    case SET_CURRENT_DATE:
      return { ...state, currentDate: action.payload };
    case UPDATE_ATTENDANCE_SUCCESS:
      return {
        ...state,
        courseList: {
          ...state.courseList,
          [action.key]: {
            ...state.courseList[action.key],
            classDates: action.value
          }
        }
      };
    case UPDATE_STUDENT_ATTENDANCE_STATUS_START:
      return {
        ...state,
        courseList: {
          ...state.courseList,
          [action.key]: {
            ...state.courseList[action.key],
            classDates: state.currentCourse.classDates.map(date =>
              date.id === state.currentDate.id
                ? {
                    ...date,
                    students: state.currentDate.students.map(student =>
                      _.isEmpty(action.value[student.docId])
                        ? student
                        : {
                            ...student,
                            attendanceStatus: action.value[student.docId].status
                          }
                    )
                  }
                : date
            )
          }
        }
      };
    case UPDATE_STUDENT_ATTENDANCE_STATUS_SUCCESS:
      return { ...state, status: { success: action.payload } };
    default:
      return state;
  }
};

export default attendanceReducer;
