import { connect } from 'react-redux';
import { setTabIndex } from '../redux/navbar/navbarActions';
import { createStructuredSelector } from 'reselect';
import {
  selectTabIndex,
  selectDrawerOpen
} from '../redux/navbar/navbarSelectors';
import NavBarItems from '../components/navbar/NavBarItems';

const mapStateToProps = createStructuredSelector({
  tabIndex: selectTabIndex,
  drawerOpen: selectDrawerOpen
});

export default connect(mapStateToProps, {
  setTabIndex
})(NavBarItems);
