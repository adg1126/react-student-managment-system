import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectClassListForPreview,
  selectIsClassesFetching
} from '../redux/classes/classesSelectors';

import { deleteClass } from '../redux/classes/classesActions';

import ClassList from '../components/classes/ClassList';
import WithSpinner from './WithSpinner';

const mapStateToProps = createStructuredSelector({
  classList: selectClassListForPreview,
  isFetching: selectIsClassesFetching
});

export default compose(
  connect(mapStateToProps, { deleteClass }),
  WithSpinner
)(ClassList);
