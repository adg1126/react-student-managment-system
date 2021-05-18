import { connect } from 'react-redux';
import { setDrawerOpen } from '../redux/tabs/tabsActions';
import NavBar from '../components/Navbar/NavBar';

const mapStateToProps = ({ tabs: { drawerOpen } }) => ({
  drawerOpen
});

export default connect(mapStateToProps, {
  setDrawerOpen
})(NavBar);
