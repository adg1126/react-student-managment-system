import { SET_NOTIFICATION_OPEN } from './notificationActionTypes';

const INITIAL_STATE = { notificationOpen: false };

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_OPEN:
      return { ...state, tabIndex: action.payload };
    default:
      return state;
  }
};

export default notificationReducer;
