import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCoursesStatus } from '../../redux/courses/coursesSelectors';

import { fetchCoursesStart } from '../../redux/courses/coursesActions';
import { fetchStudentsStart } from '../../redux/student/studentActions';
import Courses from '../../pages/Courses';

const mapStateToProps = createStructuredSelector({
  status: selectCoursesStatus
});

export default connect(mapStateToProps, {
  fetchCoursesStart,
  fetchStudentsStart
})(Courses);
