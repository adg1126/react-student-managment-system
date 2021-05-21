import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectClassesStatus } from '../redux/classes/classesSelectors';
import { selectNotificationOpen } from '../redux/notification/notificationSelectors';

import { setNotificationOpen } from '../redux/notification/notificationActions';

import Notification from '../components/notification/Notification';

const mapStateToProps = createStructuredSelector({
  status: selectClassesStatus,
  notificationOpen: selectNotificationOpen
});

export default connect(mapStateToProps, { setNotificationOpen })(Notification);
