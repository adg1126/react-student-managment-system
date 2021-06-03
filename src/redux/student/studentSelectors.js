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

export const selectStudentsErrMessage = createSelector(
  [selectStudents],
  students => students.errMessage
);

export const selectStudentsStatus = createSelector(
  [selectStudents],
  students => students.status
);

export const selectStudentsForClass = classId =>
  createSelector([selectStudentListForPreview], studentList =>
    studentList.filter(student =>
      student.courses
        ? student.courses.some(course => course.includes(classId))
        : []
    )
  );

export const selectStudentsNotInCourse = classId =>
  createSelector([selectStudentListForPreview], studentList =>
    studentList.filter(student =>
      student.courses
        ? !student.courses.some(course => course.includes(classId))
        : []
    )
  );

export const selectStudent = studentId =>
  createSelector([selectStudentList], studentList => studentList[studentId]);

export const selectStudentCourses = studentId =>
  createSelector([selectStudent(studentId)], student => student.courses);

export const selectStudentToUpdate = createSelector(
  [selectStudents],
  student => student.studentToUpdate
);
