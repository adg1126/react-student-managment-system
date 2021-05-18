import { combineReducers } from 'redux';
import tabsReducer from './tabs/tabsReducer';
import classesReducer from './classes/classesReducer';

export default combineReducers({ tabs: tabsReducer, classes: classesReducer });
