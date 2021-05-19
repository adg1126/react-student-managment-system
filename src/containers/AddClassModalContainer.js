import { connect } from 'react-redux';
import { addClass } from '../redux/classes/classesActions';
import AddClassModal from '../components/modal/AddClassModal';

export default connect(null, {
  addClass
})(AddClassModal);
