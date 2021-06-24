import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import {
  selectCurrentCourseDates,
  selectIsAttendanceFetching,
  selectAttendanceStatus
} from '../../redux/attendance/attendanceSelectors';

import { setCurrentDate } from '../../redux/attendance/attendanceActions';

import Attendance from '../../pages/Attendance';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsAttendanceFetching,
  courseDates: selectCurrentCourseDates,
  status: selectAttendanceStatus
});

export default compose(
  connect(mapStateToProps, { setCurrentDate }),
  WithSpinner
)(Attendance);
