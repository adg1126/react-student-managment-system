import { connect } from 'react-redux';

import { selectCourse } from '../../redux/courses/coursesSelectors';
import { selectStudentsStatus } from '../../redux/student/studentSelectors';
import { selectNotificationOpen } from '../../redux/notification/notificationSelectors';

import { setNotificationOpen } from '../../redux/notification/notificationActions';
import { fetchStudentsStart } from '../../redux/student/studentActions';

import CourseShow from '../../components/courses/CourseShow';

const mapStateToProps = (state, ownProps) => ({
  course: selectCourse(ownProps.match.params.courseId)(state),
  status: selectStudentsStatus(state),
  notificationOpen: selectNotificationOpen(state)
});

export default connect(mapStateToProps, {
  fetchStudentsStart,
  setNotificationOpen
})(CourseShow);
