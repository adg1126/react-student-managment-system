import { SET_NOTIFICATION_OPEN } from './notificationActionTypes';

export const setNotificationOpen = notificationOpen => ({
  type: SET_NOTIFICATION_OPEN,
  payload: notificationOpen
});
