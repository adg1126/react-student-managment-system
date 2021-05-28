import { connect } from 'react-redux';

import { selectCourse } from '../../redux/courses/coursesSelectors';
import { selectStudentsForClass } from '../../redux/student/studentSelectors';
import history from '../../history';

import CourseInfo from '../../components/courses/CourseInfo';

const mapStateToProps = state => {
  const path = history.location.pathname;
  const courseId = path.substring(path.lastIndexOf('/') + 1);
  return {
    course: selectCourse(courseId)(state),
    studentList: selectStudentsForClass(courseId)(state)
  };
};

export default connect(mapStateToProps)(CourseInfo);
