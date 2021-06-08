import { createSelector } from 'reselect';

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
