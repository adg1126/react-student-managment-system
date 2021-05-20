import { createSelector } from 'reselect';

const selectClasses = state => state.classes;

export const selectClassList = createSelector(
  [selectClasses],
  classes => classes.classList
);

export const selectClassListForPreview = createSelector(
  [selectClassList],
  classList =>
    classList ? Object.keys(classList).map(key => classList[key]) : []
);

export const selectIsClassesFetching = createSelector(
  [selectClasses],
  classes => classes.isFetching
);
