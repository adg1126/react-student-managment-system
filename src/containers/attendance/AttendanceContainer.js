import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import {
  selectCourseListForPreview,
  selectIsCoursesFetching,
  selectCoursesErrMessage,
  selectCurrentCourse
} from '../../redux/courses/coursesSelectors';
import { selectStudentListForPreview } from '../../redux/student/studentSelectors';
import { selectAttendanceForCourseClassDates } from '../../redux/attendance/attendanceSelectors';

import { fetchAttendanceForCourse } from '../../redux/attendance/attendanceActions';

import Attendance from '../../pages/Attendance';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  courseList: selectCourseListForPreview,
  currentCourse: selectCurrentCourse,
  studentList: selectStudentListForPreview,
  isFetching: selectIsCoursesFetching,
  errMessage: selectCoursesErrMessage,
  attendanceForCourseClassDates: selectAttendanceForCourseClassDates
});

export default compose(
  connect(mapStateToProps, { fetchAttendanceForCourse }),
  WithSpinner
)(Attendance);
