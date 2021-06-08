import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentCourse } from '../../redux/courses/coursesSelectors';

import { editCourse } from '../../redux/courses/coursesActions';
import { setModalOpen } from '../../redux/modal/modalActions';

import EditCourseModal from '../../components/courses/EditCourseModal';

const mapStateToProps = createStructuredSelector({
  courseToUpdate: selectCurrentCourse
});

export default connect(mapStateToProps, {
  editCourse,
  setModalOpen
})(EditCourseModal);
