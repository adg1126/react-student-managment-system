import { connect } from 'react-redux';
import history from '../../history';
import { editCourse } from '../../redux/courses/coursesActions';
import { selectCourse } from '../../redux/courses/coursesSelectors';
import { setModalOpen } from '../../redux/modal/modalActions';

import EditCourseModal from '../../components/courses/EditCourseModal';

const mapStateToProps = state => {
  const path = history.location.pathname;
  const courseId = path.substring(path.lastIndexOf('/') + 1);

  return {
    course: selectCourse(courseId)(state)
  };
};

export default connect(mapStateToProps, {
  editCourse,
  setModalOpen
})(EditCourseModal);
