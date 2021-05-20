import { connect } from 'react-redux';
import { editClass } from '../redux/classes/classesActions';

import EditClass from '../components/classes/EditClass';

const mapStateToProps = (state, ownProps) => {
  return {
    classObj: state.classes.classList[ownProps.match.params.classId]
  };
};

export default connect(mapStateToProps, { editClass })(EditClass);
