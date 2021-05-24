import { connect } from 'react-redux';
import { editClass } from '../redux/classes/classesActions';
import EditClassModal from '../components/classes/EditClassModal';

export default connect(null, {
  editClass
})(EditClassModal);
