import { connect } from 'react-redux';
import { deleteCourse } from '../../redux/courses/coursesActions';

import DeleteCourseModal from '../../components/courses/DeleteCourseModal';

export default connect(null, { deleteCourse })(DeleteCourseModal);
