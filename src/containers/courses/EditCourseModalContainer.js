import { connect } from 'react-redux';
import { editCourse } from '../../redux/courses/coursesActions';
import { selectCourse } from '../../redux/courses/coursesSelectors';
import history from '../../history';
import EditCourseModal from '../../components/courses/EditCourseModal';

const mapStateToProps = state => {
  const path = history.location.pathname;
  const courseId = path.substring(path.lastIndexOf('/') + 1);
  return {
    course: selectCourse(courseId)(state)
  };
};

export default connect(mapStateToProps, {
  editCourse
})(EditCourseModal);
