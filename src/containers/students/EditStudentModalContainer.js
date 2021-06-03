import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectStudentToUpdate } from '../../redux/student/studentSelectors';

import { editStudent } from '../../redux/student/studentActions';
import { setModalOpen } from '../../redux/modal/modalActions';

import EditStudentModal from '../../components/students/EditStudentModal';

const mapStateToProps = createStructuredSelector({
  studentToUpdate: selectStudentToUpdate
});

export default connect(mapStateToProps, {
  editStudent,
  setModalOpen
})(EditStudentModal);
