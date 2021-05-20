import { connect } from 'react-redux';
import { addClass } from '../redux/classes/classesActions';
import AddClassModal from '../components/classes/AddClassModal';

export default connect(null, {
  addClass
})(AddClassModal);
