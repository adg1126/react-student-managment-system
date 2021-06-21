import { connect } from 'react-redux';
import { selectCourseListForPreview } from '../../redux/courses/coursesSelectors';
import { selectCurrentCourse } from '../../redux/attendance/attendanceSelectors';

import { setCurrentCourse } from '../../redux/attendance/attendanceActions';

import TakeAttendance from '../../components/attendance/TakeAttendance';

const mapStateToProps = state => ({
  courseList: selectCourseListForPreview(state),
  currentCourse: selectCurrentCourse(state)
});

export default connect(mapStateToProps, {
  setCurrentCourse
})(TakeAttendance);
