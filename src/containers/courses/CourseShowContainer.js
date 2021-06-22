import { connect } from 'react-redux';
import { selectCourse } from '../../redux/courses/coursesSelectors';
import { selectStudentsStatus } from '../../redux/student/studentSelectors';

import { setModalOpen } from '../../redux/modal/modalActions';

import CourseShow from '../../pages/CourseShow';

const mapStateToProps = (state, ownProps) => ({
  course: selectCourse(ownProps.match.params.courseId)(state),
  status: selectStudentsStatus(state)
});

export default connect(mapStateToProps, { setModalOpen })(CourseShow);
