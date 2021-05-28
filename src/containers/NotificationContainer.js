import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCoursesStatus } from '../redux/courses/coursesSelectors';
import { selectNotificationOpen } from '../redux/notification/notificationSelectors';

import { setNotificationOpen } from '../redux/notification/notificationActions';

import Notification from '../components/notification/Notification';

const mapStateToProps = createStructuredSelector({
  status: selectCoursesStatus,
  notificationOpen: selectNotificationOpen
});

export default connect(mapStateToProps, { setNotificationOpen })(Notification);
