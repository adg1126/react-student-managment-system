import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setDrawerOpen } from '../../redux/navbar/navbarActions';
import { signOutStart } from '../../redux/user/userActions';

import { selectDrawerOpen } from '../../redux/navbar/navbarSelectors';
import { selectCurrentUser } from '../../redux/user/userSelectors';
import Drawer from '../../components/appbar/Drawer';

const mapStateToProps = createStructuredSelector({
  drawerOpen: selectDrawerOpen,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, {
  setDrawerOpen,
  signOutStart
})(Drawer);
