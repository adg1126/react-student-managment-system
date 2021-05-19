import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectClassList } from '../redux/classes/classesSelectors';

import { deleteClass } from '../redux/classes/classesActions';

import ClassList from '../components/table/ClassList';

const mapStateToProps = createStructuredSelector({
  classList: selectClassList
});

export default connect(mapStateToProps, { deleteClass })(ClassList);
