import { connect } from 'react-redux';

import { selectClass } from '../redux/classes/classesSelectors';

import ClassShow from '../components/classes/ClassShow';

const mapStateToProps = (state, ownProps) => ({
  classObj: selectClass(ownProps.match.params.classId)(state)
});

export default connect(mapStateToProps)(ClassShow);
