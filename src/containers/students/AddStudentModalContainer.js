import { connect } from 'react-redux';
import history from '../../history';

import { selectStudentsNotInCourse } from '../../redux/student/studentSelectors';
import { selectCourse } from '../../redux/courses/coursesSelectors';

import {
  addStudent,
  addExistingStudentToCourse
} from '../../redux/student/studentActions';
import { setModalOpen } from '../../redux/modal/modalActions';

import AddStudentModal from '../../components/students/AddStudentModal';

const mapStateToProps = state => {
  const path = history.location.pathname;
  const classId = path.substring(path.lastIndexOf('/') + 1);

  return {
    studentList:
      path !== '/students' ? selectStudentsNotInCourse(classId)(state) : [],
    course: path !== '/students' ? selectCourse(classId)(state) : null
  };
};

export default connect(mapStateToProps, {
  addStudent,
  addExistingStudentToCourse,
  setModalOpen
})(AddStudentModal);
