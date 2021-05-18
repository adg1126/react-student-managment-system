import { connect } from 'react-redux';
import Classes from '../pages/Classes';

const mapStateToProps = ({ tabs: { drawerOpen } }) => ({
  drawerOpen
});

export default connect(mapStateToProps)(Classes);
