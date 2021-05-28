import { connect } from 'react-redux';
import { editCourse } from '../../redux/courses/coursesActions';
import EditCourseModal from '../../components/courses/EditCourseModal';

export default connect(null, {
  editCourse
})(EditCourseModal);
