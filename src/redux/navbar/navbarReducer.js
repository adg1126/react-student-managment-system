import { SET_TAB_INDEX, SET_DRAWER_OPEN } from './navbarActionTypes';

const INITIAL_STATE = {
  tabIndex: 0,
  drawerOpen: true
};

const navbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TAB_INDEX:
      return { ...state, tabIndex: action.payload };
    case SET_DRAWER_OPEN:
      return { ...state, drawerOpen: action.payload };
    default:
      return state;
  }
};

export default navbarReducer;
