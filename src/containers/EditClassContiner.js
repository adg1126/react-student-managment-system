import { connect } from 'react-redux';

import { selectClass } from '../redux/classes/classesSelectors';

import { editClass } from '../redux/classes/classesActions';

import EditClass from '../components/classes/EditClass';

const mapStateToProps = (state, ownProps) => ({
  classObj: selectClass(ownProps.match.params.classId)(state)
});

export default connect(mapStateToProps, { editClass })(EditClass);
