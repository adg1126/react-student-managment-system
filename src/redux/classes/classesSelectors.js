import { createSelector } from 'reselect';

const selectClasses = state => state.classes;

export const selectClassList = createSelector(
  [selectClasses],
  classes => classes.classList
);
