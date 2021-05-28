import { connect } from 'react-redux';

import { selectClass } from '../redux/classes/classesSelectors';
import { selectStudentsForClass } from '../redux/student/studentSelectors';

import ClassShow from '../components/classes/ClassShow';

const mapStateToProps = (state, ownProps) => ({
  classObj: selectClass(ownProps.match.params.classId)(state),
  studentList: selectStudentsForClass(ownProps.match.params.classId)(state)
});

export default connect(mapStateToProps)(ClassShow);
