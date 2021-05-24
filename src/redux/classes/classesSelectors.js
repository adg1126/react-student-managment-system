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

export const selectClass = classId =>
  createSelector([selectClassList], classes =>
    classes ? classes[classId] : null
  );

export const selectIsClassesFetching = createSelector(
  [selectClasses],
  classes => classes.isFetching
);

export const selectClassesStatus = createSelector(
  [selectClasses],
  classes => classes.status
);

export const selectClassStudents = classId =>
  createSelector([selectClass(classId)], classObj =>
    classObj ? classObj.students : null
  );
