import { connect } from 'react-redux';
import { editClass } from '../redux/classes/classesActions';
import {
  selectClass,
  selectClassesStatus
} from '../redux/classes/classesSelectors';
import EditClass from '../components/classes/EditClass';

const mapStateToProps = (state, ownProps) => ({
  classObj: selectClass(ownProps.match.params.classId)(state),
  status: selectClassesStatus(state)
});

export default connect(mapStateToProps, { editClass })(EditClass);
