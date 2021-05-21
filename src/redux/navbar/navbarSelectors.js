import { createSelector } from 'reselect';

const selectNavbar = state => state.navbar;

export const selectTabIndex = createSelector(
  [selectNavbar],
  navbar => navbar.tabIndex
);

export const selectDrawerOpen = createSelector(
  [selectNavbar],
  navbar => navbar.drawerOpen
);
