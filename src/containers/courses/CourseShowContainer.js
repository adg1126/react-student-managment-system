import { connect } from 'react-redux';
import { selectCourse } from '../../redux/courses/coursesSelectors';
import { selectStudentsStatus } from '../../redux/student/studentSelectors';

import { fetchStudentsStart } from '../../redux/student/studentActions';
import { setModalOpen } from '../../redux/modal/modalActions';

import CourseShow from '../../components/courses/CourseShow';

const mapStateToProps = (state, ownProps) => ({
  course: selectCourse(ownProps.match.params.courseId)(state),
  status: selectStudentsStatus(state)
});

export default connect(mapStateToProps, { fetchStudentsStart, setModalOpen })(
  CourseShow
);
