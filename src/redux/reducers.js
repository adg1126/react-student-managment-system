import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import navbarReducer from './navbar/navbarReducer';
import classesReducer from './classes/classesReducer';

export default combineReducers({
  navbar: navbarReducer,
  classes: classesReducer,
  form: formReducer
});
