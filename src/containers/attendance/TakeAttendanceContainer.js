import { connect } from 'react-redux';
import {
  selectCourseListForPreview,
  selectCurrentCourse
} from '../../redux/courses/coursesSelectors';
import { selectStudentsForClass } from '../../redux/student/studentSelectors';

import { setCurrentCourse } from '../../redux/courses/coursesActions';

import TakeAttendance from '../../components/attendance/TakeAttendance';

const mapStateToProps = state => ({
  courseList: selectCourseListForPreview(state),
  filteredStudents: selectStudentsForClass(
    typeof selectCurrentCourse(state) === 'string'
  )(state)
});

export default connect(mapStateToProps, { setCurrentCourse })(TakeAttendance);
