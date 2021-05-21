import { createSelector } from 'reselect';

const selectNotification = state => state.notification;

export const selectNotificationOpen = createSelector(
  [selectNotification],
  classes => classes.notificationOpen
);
