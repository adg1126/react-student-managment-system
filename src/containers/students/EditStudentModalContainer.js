import { connect } from 'react-redux';
import { editStudent } from '../../redux/student/studentActions';
import EditStudentModal from '../../components/students/EditStudentModal';

export default connect(null, {
  editStudent
})(EditStudentModal);
