import { combineReducers } from 'redux';
import tabsReducer from './tabs/tabsReducer';

export default combineReducers({ tabs: tabsReducer });
