import { connect } from 'react-redux';
import { addCourse } from '../../redux/courses/coursesActions';
import { setModalOpen } from '../../redux/modal/modalActions';

import AddCourseModal from '../../components/courses/AddCourseModal';

export default connect(null, {
  addCourse,
  setModalOpen
})(AddCourseModal);
