import { createSelector } from 'reselect';

const selectStudents = state => state.student;

export const selectStudentList = createSelector(
  [selectStudents],
  student => student.studentList
);

export const selectStudentListForPreview = createSelector(
  [selectStudentList],
  studentList =>
    studentList ? Object.keys(studentList).map(key => studentList[key]) : []
);

export const selectIsStudentsFetching = createSelector(
  [selectStudents],
  students => students.isFetching
);
