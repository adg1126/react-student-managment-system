import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentCourse } from '../../redux/attendance/attendanceSelectors';

import ConvertToExcel from '../../components/attendance/ConvertToExcel';

const mapStateToProps = createStructuredSelector({
  currentCourse: selectCurrentCourse
});

export default connect(mapStateToProps)(ConvertToExcel);
