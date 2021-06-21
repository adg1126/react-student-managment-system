import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentCourse } from '../../redux/courses/coursesSelectors';
import {
  selectCurrentCourseDates,
  selectIsAttendanceFetching,
  selectAttendanceStatus
} from '../../redux/attendance/attendanceSelectors';

import {
  fetchAttendanceStart,
  setCurrentCourse,
  setCurrentDate
} from '../../redux/attendance/attendanceActions';

import Attendance from '../../pages/Attendance';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsAttendanceFetching,
  currentCourse: selectCurrentCourse,
  CourseDates: selectCurrentCourseDates,
  status: selectAttendanceStatus
});

export default compose(
  connect(mapStateToProps, {
    fetchAttendanceStart,
    setCurrentCourse,
    setCurrentDate
  }),
  WithSpinner
)(Attendance);
