import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentCourse } from '../../redux/courses/coursesSelectors';
import {
  selectAttendanceForCourseClassDates,
  selectIsAttendanceFetching
} from '../../redux/attendance/attendanceSelectors';

import {
  fetchAttendanceStart,
  fetchAttendanceForCourse
} from '../../redux/attendance/attendanceActions';

import Attendance from '../../pages/Attendance';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsAttendanceFetching,
  currentCourse: selectCurrentCourse,
  attendanceForCourseClassDates: selectAttendanceForCourseClassDates
});

export default compose(
  connect(mapStateToProps, { fetchAttendanceStart, fetchAttendanceForCourse }),
  WithSpinner
)(Attendance);
