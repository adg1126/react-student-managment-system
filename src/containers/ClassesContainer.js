import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectClassesStatus } from '../redux/classes/classesSelectors';
import { selectNotificationOpen } from '../redux/notification/notificationSelectors';

import { setDrawerOpen } from '../redux/navbar/navbarActions';
import { setNotificationOpen } from '../redux/notification/notificationActions';

import Classes from '../pages/Classes';

const mapStateToProps = createStructuredSelector({
  status: selectClassesStatus,
  notificationOpen: selectNotificationOpen
});

export default connect(mapStateToProps, { setDrawerOpen, setNotificationOpen })(
  Classes
);
