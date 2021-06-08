import { connect } from 'react-redux';

import { deleteCourse } from '../../redux/courses/coursesActions';
import { setModalOpen } from '../../redux/modal/modalActions';

import { createStructuredSelector } from 'reselect';
import { selectCurrentCourse } from '../../redux/courses/coursesSelectors';

import DeleteCourseModal from '../../components/courses/DeleteCourseModal';

const mapStateToProps = createStructuredSelector({
  courseToUpdate: selectCurrentCourse
});

export default connect(mapStateToProps, { deleteCourse, setModalOpen })(
  DeleteCourseModal
);
