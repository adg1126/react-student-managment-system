import { connect } from 'react-redux';
import { selectDrawerOpen } from '../redux/navbar/navbarSelectors';
import { selectClassesStatus } from '../redux/classes/classesSelectors';
import { createStructuredSelector } from 'reselect';
import Classes from '../pages/Classes';

const mapStateToProps = createStructuredSelector({
  drawerOpen: selectDrawerOpen,
  status: selectClassesStatus
});

export default connect(mapStateToProps)(Classes);
