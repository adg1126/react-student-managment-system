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

export const selectIsAttendanceFetching = createSelector(
  [selectAttendance],
  attendance => attendance.isFetching
);

export const selectCurrentCourse = createSelector(
  [selectAttendance],
  attendance => attendance.currentCourse
);

export const selectCurrentCourseDates = createSelector(
  [selectCurrentCourse],
  currentCourse => (_.isEmpty(currentCourse) ? [] : currentCourse.classDates)
);

export const selectCurrentDate = createSelector(
  [selectAttendance],
  attendance => attendance.currentDate
);

export const selectCurrentDateStudents = currentDate =>
  createSelector([selectCurrentCourse], currentCourse =>
    _.isEmpty(currentDate) && _.isEmpty(currentCourse)
      ? []
      : _.compact(
          _.flattenDeep(
            currentCourse.classDates.map(date =>
              _.isEqual(date, currentDate) ? date.students : null
            )
          )
        )
  );

export const selectCourse = courseId =>
  createSelector([selectAttendanceCourseList], courseList =>
    _.isEmpty(courseList) && _.isEmpty(courseId) ? {} : courseList[courseId]
  );

export const selectAttendanceStatus = createSelector(
  [selectAttendance],
  attendance => attendance.status
);
