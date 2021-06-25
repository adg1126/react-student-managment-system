import { compose } from 'redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import {
  selectAttendanceCourseListForPreview,
  selectIsAttendanceFetching,
  selectAttendanceStatus
} from '../../redux/attendance/attendanceSelectors';

import { setCurrentDate } from '../../redux/attendance/attendanceActions';

import Schedule from '../../pages/Schedule';
import WithSpinner from '../WithSpinner';

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsAttendanceFetching,
  courseList: selectAttendanceCourseListForPreview,
  status: selectAttendanceStatus
});

export default compose(
  connect(mapStateToProps, { setCurrentDate }),
  WithSpinner
)(Schedule);
