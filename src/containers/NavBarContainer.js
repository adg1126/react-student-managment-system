import { connect } from 'react-redux';
import { setDrawerOpen } from '../redux/navbar/navbarActions';
import { createStructuredSelector } from 'reselect';
import { selectDrawerOpen } from '../redux/navbar/navbarSelectors';
import NavBar from '../components/navbar/NavBar';

const mapStateToProps = createStructuredSelector({
  drawerOpen: selectDrawerOpen
});

export default connect(mapStateToProps, {
  setDrawerOpen
})(NavBar);
