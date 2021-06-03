import { createSelector } from 'reselect';

const selectCourses = state => state.courses;

export const selectCourseList = createSelector(
  [selectCourses],
  courses => courses.courseList
);

export const selectCourseListForPreview = createSelector(
  [selectCourseList],
  courseList =>
    courseList ? Object.keys(courseList).map(key => courseList[key]) : []
);

export const selectCourse = courseId =>
  createSelector([selectCourseList], courses =>
    courses ? courses[courseId] : null
  );

export const selectIsCoursesFetching = createSelector(
  [selectCourses],
  courses => courses.isFetching
);

export const selectCoursesErrMessage = createSelector(
  [selectCourses],
  courses => courses.errMessage
);

export const selectCoursesStatus = createSelector(
  [selectCourses],
  courses => courses.status
);

export const selectCourseToUpdate = createSelector(
  [selectCourses],
  courses => courses.courseToUpdate
);
