import { connect } from 'react-redux';

import { selectClass } from '../redux/classes/classesSelectors';

import { editClass } from '../redux/classes/classesActions';

import ClassEdit from '../components/classes/ClassEdit';

const mapStateToProps = (state, ownProps) => ({
  classObj: selectClass(ownProps.match.params.classId)(state)
});

export default connect(mapStateToProps, { editClass })(ClassEdit);
