import { connect } from 'react-redux';
import { addCourse } from '../../redux/courses/coursesActions';
import AddCourseModal from '../../components/courses/AddCourseModal';

export default connect(null, {
  addCourse
})(AddCourseModal);
