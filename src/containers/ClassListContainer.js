import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectClassesClassList,
  selectIsClassesFetching
} from '../redux/classes/classesSelectors';

import { deleteClass } from '../redux/classes/classesActions';

import ClassList from '../components/table/ClassList';
import WithSpinner from './WithSpinner';

const mapStateToProps = createStructuredSelector({
  classList: selectClassesClassList,
  isFetching: selectIsClassesFetching
});

export default compose(
  connect(mapStateToProps, { deleteClass }),
  WithSpinner
)(ClassList);
