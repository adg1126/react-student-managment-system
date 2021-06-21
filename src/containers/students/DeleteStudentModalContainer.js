import { connect } from 'react-redux';
import {
  deleteStudentStart,
  deleteStudentFromCourseStart
} from '../../redux/student/studentActions';
import DeleteStudentModal from '../../components/students/DeleteStudentModal';
import { setModalOpen } from '../../redux/modal/modalActions';

import { selectCourse } from '../../redux/courses/coursesSelectors';
import { selectStudentToUpdate } from '../../redux/student/studentSelectors';

import history from '../../history';

const mapStateToProps = state => {
  const path = history.location.pathname;
  const classId = path.substring(path.lastIndexOf('/') + 1);

  return {
    course: path !== '/students' ? selectCourse(classId)(state) : null,
    studentToUpdate: selectStudentToUpdate(state)
  };
};

export default connect(mapStateToProps, {
  deleteStudentStart,
  deleteStudentFromCourseStart,
  setModalOpen
})(DeleteStudentModal);
