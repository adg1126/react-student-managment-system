import {
  FETCH_COURSES_START,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  ADD_COURSE_START,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  DELETE_COURSE_START,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  EDIT_COURSE_START,
  EDIT_COURSE_SUCCESS,
  EDIT_COURSE_FAILURE,
  SET_CURRENT_COURSE
} from './coursesActionTypes';

export const fetchCoursesStart = () => ({
  type: FETCH_COURSES_START
});

export const fetchCoursesSuccesss = coursesMap => ({
  type: FETCH_COURSES_SUCCESS,
  payload: coursesMap
});

export const fetchCoursesFailure = errMsg => ({
  type: FETCH_COURSES_FAILURE,
  payload: errMsg
});

export const addCourse = courseData => ({
  type: ADD_COURSE_START,
  payload: courseData
});

export const addCourseSuccess = (courseDocId, courseData) => ({
  type: ADD_COURSE_SUCCESS,
  key: courseDocId,
  value: courseData
});

export const addCourseFailure = errMsg => ({
  type: ADD_COURSE_FAILURE,
  payload: errMsg
});

export const deleteCourse = courseDocId => ({
  type: DELETE_COURSE_START,
  payload: courseDocId
});

export const deleteCourseSuccess = courseDocId => ({
  type: DELETE_COURSE_SUCCESS,
  payload: courseDocId
});

export const deleteCourseFailure = errMsg => ({
  type: DELETE_COURSE_FAILURE,
  payload: errMsg
});

export const editCourse = (courseDocId, courseData) => ({
  type: EDIT_COURSE_START,
  key: courseDocId,
  value: courseData
});

export const editCourseSuccess = courseData => ({
  type: EDIT_COURSE_SUCCESS,
  payload: courseData
});

export const editCourseFailure = errMsg => ({
  type: EDIT_COURSE_FAILURE,
  payload: errMsg
});

export const setCurrentCourse = courseData => ({
  type: SET_CURRENT_COURSE,
  payload: courseData
});
