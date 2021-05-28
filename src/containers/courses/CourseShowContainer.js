import { connect } from 'react-redux';

import { selectCourse } from '../../redux/courses/coursesSelectors';
import { selectStudentsForClass } from '../../redux/student/studentSelectors';

import CourseShow from '../../components/courses/CourseShow';

const mapStateToProps = (state, ownProps) => ({
  course: selectCourse(ownProps.match.params.courseId)(state),
  studentList: selectStudentsForClass(ownProps.match.params.courseId)(state)
});

export default connect(mapStateToProps)(CourseShow);
