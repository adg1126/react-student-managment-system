import { createSelector } from 'reselect';

const selectClasses = state => state.classes;

export const selectClasseList = createSelector(
  [selectClasses],
  classes => classes.classList
);

export const selectClasseListForPreview = createSelector(
  [selectClasseList],
  classes => (classes ? Object.keys(classes).map(key => classes[key]) : [])
);
