import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectStudentsStatus } from '../../redux/student/studentSelectors';

import { fetchStudentsStart } from '../../redux/student/studentActions';
import Students from '../../pages/Students';

const mapStateToProps = createStructuredSelector({
  status: selectStudentsStatus
});

export default connect(mapStateToProps, {
  fetchStudentsStart
})(Students);
