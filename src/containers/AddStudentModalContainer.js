import { connect } from 'react-redux';
import { addStudent } from '../redux/student/studentActions';
import AddStudentModal from '../components/students/AddStudentModal';

export default connect(null, {
  addStudent
})(AddStudentModal);
