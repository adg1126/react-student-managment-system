import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setDrawerOpen } from '../../redux/navbar/navbarActions';

import { selectDrawerOpen } from '../../redux/navbar/navbarSelectors';
import Appbar from '../../components/appbar/Appbar';

const mapStateToProps = createStructuredSelector({
  drawerOpen: selectDrawerOpen
});

export default connect(mapStateToProps, {
  setDrawerOpen
})(Appbar);
