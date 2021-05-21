import { SET_TAB_INDEX, SET_DRAWER_OPEN } from './navbarActionTypes';

export const setTabIndex = i => ({
  type: SET_TAB_INDEX,
  payload: i
});

export const setDrawerOpen = drawerOpen => ({
  type: SET_DRAWER_OPEN,
  payload: drawerOpen
});
