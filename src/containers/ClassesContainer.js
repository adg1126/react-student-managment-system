import { connect } from 'react-redux';
import Classes from '../pages/Classes';

const mapStateToProps = ({ tabs: { drawerOpen }, classes: { status } }) => ({
  drawerOpen,
  status
});

export default connect(mapStateToProps)(Classes);
