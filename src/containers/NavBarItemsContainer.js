import { connect } from 'react-redux';
import { setTabIndex } from '../redux/tabs/tabsActions';
import NavBarItems from '../components/navbar/NavBarItems';

const mapStateToProps = ({ tabs: { tabIndex, drawerOpen } }) => ({
  tabIndex,
  drawerOpen
});

export default connect(mapStateToProps, {
  setTabIndex
})(NavBarItems);
