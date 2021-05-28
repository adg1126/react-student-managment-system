import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectClassListForPreview,
  selectIsClassesFetching
} from '../redux/classes/classesSelectors';
import { selectStudentListForPreview } from '../redux/student/studentSelectors';

import { deleteClass } from '../redux/classes/classesActions';

import ClassListTable from '../components/classes/ClassListTable';
import WithSpinner from './WithSpinner';

const mapStateToProps = createStructuredSelector({
  classList: selectClassListForPreview,
  isFetching: selectIsClassesFetching,
  studentList: selectStudentListForPreview
});

export default compose(
  connect(mapStateToProps, { deleteClass }),
  WithSpinner
)(ClassListTable);
