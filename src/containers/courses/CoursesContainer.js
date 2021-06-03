import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCoursesStatus } from '../../redux/courses/coursesSelectors';

import { setModalOpen } from '../../redux/modal/modalActions';
import Courses from '../../pages/Courses';

const mapStateToProps = createStructuredSelector({
  status: selectCoursesStatus
});

export default connect(mapStateToProps, {
  setModalOpen
})(Courses);
