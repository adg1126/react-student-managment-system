import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectClasseListForPreview } from '../redux/classes/classesSelectors';

import ClassList from '../components/table/ClassList';

const mapStateToProps = createStructuredSelector({
  classList: selectClasseListForPreview
});

export default connect(mapStateToProps)(ClassList);
