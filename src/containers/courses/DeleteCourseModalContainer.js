import { connect } from 'react-redux';

import { deleteCourse } from '../../redux/courses/coursesActions';
import { setModalOpen } from '../../redux/modal/modalActions';

import { createStructuredSelector } from 'reselect';
import { selectCourseToUpdate } from '../../redux/courses/coursesSelectors';

import DeleteCourseModal from '../../components/courses/DeleteCourseModal';

const mapStateToProps = createStructuredSelector({
  courseToUpdate: selectCourseToUpdate
});

export default connect(mapStateToProps, { deleteCourse, setModalOpen })(
  DeleteCourseModal
);
