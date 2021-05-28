import {
  FETCH_COURSES_START,
  ADD_COURSE_START,
  DELETE_COURSE_START,
  EDIT_COURSE_START
} from './coursesActionTypes';

export const fetchCoursesStart = () => ({
  type: FETCH_COURSES_START
});

export const addCourse = course => ({
  type: ADD_COURSE_START,
  payload: course
});

export const deleteCourse = docId => ({
  type: DELETE_COURSE_START,
  payload: docId
});

export const editCourse = (docId, course) => ({
  type: EDIT_COURSE_START,
  key: docId,
  value: course
});
