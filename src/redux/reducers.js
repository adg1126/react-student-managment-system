import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tabsReducer from './tabs/tabsReducer';
import classesReducer from './classes/classesReducer';

export default combineReducers({
  tabs: tabsReducer,
  classes: classesReducer,
  form: formReducer
});
