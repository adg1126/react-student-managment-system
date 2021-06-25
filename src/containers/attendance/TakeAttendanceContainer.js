import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCourseListForPreview } from '../../redux/courses/coursesSelectors';
import {
  selectCurrentCourse,
  selectCurrentDate
} from '../../redux/attendance/attendanceSelectors';

import { setCurrentCourse } from '../../redux/attendance/attendanceActions';

import TakeAttendance from '../../components/attendance/TakeAttendance';

const mapStateToProps = createStructuredSelector({
  courseList: selectCourseListForPreview,
  currentCourse: selectCurrentCourse,
  currentDate: selectCurrentDate
});

export default connect(mapStateToProps, {
  setCurrentCourse
})(TakeAttendance);
