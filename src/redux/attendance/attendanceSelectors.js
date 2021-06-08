import { createSelector } from 'reselect';
import _ from 'lodash';

const selectAttendance = state => state.attendance;

export const selectAttendanceCourseList = createSelector(
  [selectAttendance],
  attendance => attendance.courseList
);

export const selectAttendanceCourseListForPreview = createSelector(
  [selectAttendanceCourseList],
  courseList =>
    courseList ? Object.keys(courseList).map(key => courseList[key]) : []
);

export const selectAttendanceForCourse = createSelector(
  [selectAttendance],
  attendance => attendance.attendanceForCourse || {}
);

export const selectAttendanceForCourseClassDates = createSelector(
  [selectAttendanceForCourse],
  attendanceForCourse =>
    _.isEmpty(attendanceForCourse) ? [] : attendanceForCourse.classDates
);
