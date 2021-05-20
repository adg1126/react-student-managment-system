import { createSelector } from 'reselect';

const selectClasses = state => state.classes;

export const selectClassesClassList = createSelector(
  [selectClasses],
  classes => classes.classList
);

export const selectIsClassesFetching = createSelector(
  [selectClasses],
  classes => classes.isFetching
);
