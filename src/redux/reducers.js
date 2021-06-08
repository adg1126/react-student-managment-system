import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navbarReducer from './navbar/navbarReducer';
import coursesReducer from './courses/coursesReducer';
import notificationReducer from './notification/notificationReducer';
import userReducer from './user/userReducer';
import studentReducer from './student/studentReducers';
import modalReducer from './modal/modalReducers';
import attendanceReducer from './attendance/attendanceReducer';

export default combineReducers({
  courses: coursesReducer,
  attendance: attendanceReducer,
  user: userReducer,
  student: studentReducer,
  navbar: navbarReducer,
  notification: notificationReducer,
  modal: modalReducer,
  form: formReducer
});
