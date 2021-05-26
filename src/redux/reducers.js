import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navbarReducer from './navbar/navbarReducer';
import classesReducer from './classes/classesReducer';
import notificationReducer from './notification/notificationReducer';
import userReducer from './user/userReducer';

export default combineReducers({
  navbar: navbarReducer,
  classes: classesReducer,
  notification: notificationReducer,
  user: userReducer,
  form: formReducer
});
