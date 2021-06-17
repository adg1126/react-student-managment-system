import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { firestore } from '../../config/firebase';
import _ from 'lodash';

import {
  FETCH_ATTENDANCE_START,
  FETCH_ATTENDANCE_SUCCESS,
  UPDATE_STUDENT_ATTENDANCE_STATUS,
  UPDATE_STUDENT_ATTENDANCE_STATUS_SUCCESS
} from './attendanceActionTypes';
import {
  ADD_COURSE_SUCCESS,
  EDIT_COURSE_SUCCESS,
  DELETE_COURSE_SUCCESS,
  FETCH_COURSES_SUCCESS
} from '../courses/coursesActionTypes';
import {
  ADD_STUDENT_SUCCESS,
  DELETE_STUDENT_FROM_COURSE,
  FETCH_STUDENTS_SUCCESS,
  ADD_EXISTING_STUDENT_TO_COURSE,
  EDIT_STUDENT
} from '../student/studentActionTypes';
import {
  fetchAttendanceSuccesss,
  fetchAttendanceFailure,
  updateAttendanceSuccess,
  updateStudentAttendanceStatusSuccess
} from './attendanceActions';

import { selectCurrentUser } from '../user/userSelectors';
import { selectCourseListForPreview } from '../courses/coursesSelectors';
import { selectStudentListForPreview } from '../student/studentSelectors';
import {
  selectAttendanceCourseListForPreview,
  selectCourse
} from '../attendance/attendanceSelectors';

import {
  convertAttendanceSnapshotToMap,
  getClassDates
} from './attendanceUtils';

export function* fetchAttendanceAsync() {
  const currentUser = yield select(selectCurrentUser);
  const AttendanceRef = firestore
    .collection('attendance')
    .where('userId', '==', currentUser.id);

  try {
    const snapshot = yield AttendanceRef.get();
    const AttendanceRefMap = yield call(
      convertAttendanceSnapshotToMap,
      snapshot
    );
    yield put(fetchAttendanceSuccesss(AttendanceRefMap));
  } catch (err) {
    yield put(fetchAttendanceFailure(err.message));
  }
}

export function* fetchAttendanceStart() {
  yield takeLatest(FETCH_ATTENDANCE_START, fetchAttendanceAsync);
}

export function* addAttendanceInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  const attendanceRef = firestore.collection('attendance');
  const courseList = yield select(selectCourseListForPreview);
  const studentList = yield select(selectStudentListForPreview);

  if (currentUser && courseList.length && studentList.length) {
    yield courseList.forEach(async course => {
      const {
        docId,
        courseDates: { startDate, endDate },
        daysMeetAndTime,
        courseCode
      } = course;

      const courseStudents = _.compact(
        studentList.map(student =>
          student.courses.includes(docId)
            ? {
                ..._.pick(student, ['docId', 'fullName']),
                attendanceStatus: ''
              }
            : null
        )
      );

      let courseAttendanceSnapshot = await attendanceRef
        .where('courseId', '==', docId)
        .get();

      const newDates = getClassDates(
        startDate,
        endDate,
        daysMeetAndTime,
        courseCode,
        courseStudents
      );

      if (courseAttendanceSnapshot.empty) {
        await attendanceRef.add({
          classDates: newDates,
          userId: currentUser.id,
          courseId: docId,
          courseCode
        });
      }
    });
  }
}

export function* onAddAttendanceInFireBase() {
  yield takeLatest(
    [
      FETCH_COURSES_SUCCESS,
      ADD_COURSE_SUCCESS,
      FETCH_STUDENTS_SUCCESS,
      ADD_STUDENT_SUCCESS,
      DELETE_STUDENT_FROM_COURSE
    ],
    addAttendanceInFirebase
  );
}

export function* updateAttendanceInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  const attendanceRef = firestore.collection('attendance');
  const attendanceCourseList = yield select(
    selectAttendanceCourseListForPreview
  );
  const courseList = yield select(selectCourseListForPreview);
  const studentList = yield select(selectStudentListForPreview);

  if (
    currentUser &&
    courseList.length &&
    attendanceCourseList.length &&
    studentList.length
  ) {
    for (let course of courseList) {
      const courseStudents = _.compact(
        studentList.map(student =>
          student.courses.includes(course.docId)
            ? {
                ..._.pick(student, ['docId', 'fullName']),
                attendanceStatus: ''
              }
            : null
        )
      );

      const newDates = getClassDates(
        course.courseDates.startDate,
        course.courseDates.endDate,
        course.daysMeetAndTime,
        course.courseCode,
        courseStudents
      );

      let courseAttendanceSnapshot = yield attendanceRef
        .where('courseId', '==', course.docId)
        .get();

      if (!courseAttendanceSnapshot.empty) {
        for (let aCourse of attendanceCourseList) {
          if (aCourse.courseId.includes(course.docId)) {
            let newClassDates;

            newClassDates =
              aCourse.classDates.length > newDates.length
                ? newDates.map(
                    date =>
                      _.compact(
                        _.flatten(
                          aCourse.classDates.map(aDate =>
                            date.startDate.toString() ===
                            aDate.startDate.toString()
                              ? aDate
                              : null
                          )
                        )
                      )[0]
                  )
                : newDates.reduce((res, obj2) => {
                    if (
                      aCourse.classDates.some(
                        obj1 =>
                          obj2.startDate.toString() ===
                          obj1.startDate.toString()
                      )
                    ) {
                      if (
                        aCourse.classDates.some(obj1 =>
                          obj2.students.every(student =>
                            obj1.students.includes(student.docId)
                          )
                        )
                      ) {
                        return res;
                      } else {
                        if (!_.isEmpty(res)) {
                          return aCourse.classDates.map(aDate => {
                            let newStudents = _.flattenDeep(
                              obj2.students.map(obj2Student => [
                                ...aDate.students.filter(
                                  resStudent =>
                                    obj2Student.docId === resStudent.docId
                                ),
                                obj2Student
                              ])
                            );

                            return {
                              ...aDate,
                              students: _.uniqWith(newStudents, (x, y) =>
                                _.isEqual(x.docId, y.docId)
                                  ? !x.attendanceStatus.length ||
                                    !y.attendanceStatus.length
                                  : null
                              )
                            };
                          });
                        }
                      }
                    } else {
                      return [...res, obj2];
                    }
                  }, aCourse.classDates);

            yield courseAttendanceSnapshot.forEach(doc => {
              doc.ref.update({
                classDates: newClassDates
              });
            });
            yield put(updateAttendanceSuccess(aCourse.docId, newClassDates));
          }
        }
      }
    }
  }
}

export function* onUpdateAttendanceInFireBase() {
  yield takeLatest(
    [
      FETCH_ATTENDANCE_SUCCESS,
      UPDATE_STUDENT_ATTENDANCE_STATUS_SUCCESS,
      FETCH_COURSES_SUCCESS,
      EDIT_COURSE_SUCCESS,
      FETCH_STUDENTS_SUCCESS,
      ADD_STUDENT_SUCCESS,
      DELETE_STUDENT_FROM_COURSE,
      ADD_EXISTING_STUDENT_TO_COURSE,
      EDIT_STUDENT
    ],
    updateAttendanceInFirebase
  );
}

export function* updateStudentAttendanceInFirebase({ key: courseDocId }) {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const course = yield select(selectCourse(courseDocId));
      const attendanceForCourseRef = firestore
        .collection('attendance')
        .doc(courseDocId);

      yield attendanceForCourseRef.update(_.omit(course, 'docId'));
      yield put(
        updateStudentAttendanceStatusSuccess('Successfully updated attendance')
      );
    } catch (err) {
      console.log(err.message);
    }
  }
}

export function* onUpdateStudentAttendanceInFirebase() {
  yield takeLatest(
    UPDATE_STUDENT_ATTENDANCE_STATUS,
    updateStudentAttendanceInFirebase
  );
}

export function* attendanceSagas() {
  yield all([
    call(fetchAttendanceStart),
    call(onUpdateAttendanceInFireBase),
    call(onAddAttendanceInFireBase),
    call(onUpdateStudentAttendanceInFirebase)
  ]);
}
