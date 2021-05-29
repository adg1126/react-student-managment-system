import { connect } from 'react-redux';
import { fetchCoursesStart } from '../../redux/courses/coursesActions';
import Courses from '../../pages/Courses';

export default connect(null, {
  fetchCoursesStart
})(Courses);
