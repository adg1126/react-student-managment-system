import { connect } from 'react-redux';
import { setDrawerOpen } from '../redux/navbar/navbarActions';
import { signOutStart } from '../redux/user/userActions';
import { createStructuredSelector } from 'reselect';
import { selectDrawerOpen } from '../redux/navbar/navbarSelectors';
import { selectCurrentUser } from '../redux/user/userSelectors';
import NavBar from '../components/navbar/NavBar';

const mapStateToProps = createStructuredSelector({
  drawerOpen: selectDrawerOpen,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, {
  setDrawerOpen,
  signOutStart
})(NavBar);
