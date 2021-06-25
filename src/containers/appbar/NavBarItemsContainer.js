import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTabIndex,
  selectDrawerOpen
} from '../../redux/navbar/navbarSelectors';
import { setTabIndex, setDrawerOpen } from '../../redux/navbar/navbarActions';

import NavBarItems from '../../components/appbar/NavBarItems';

const mapStateToProps = createStructuredSelector({
  tabIndex: selectTabIndex,
  drawerOpen: selectDrawerOpen
});

export default connect(mapStateToProps, {
  setTabIndex,
  setDrawerOpen
})(NavBarItems);
