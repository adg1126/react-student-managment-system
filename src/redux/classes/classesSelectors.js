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

// export const selectCollection = collectionId =>
//   createSelector([selectShopCollections], collections =>
//     collections ? collections[collectionId] : null
//   );

// export const selectIsCollectionFetching = createSelector(
//   [selectShop],
//   shop => shop.isFetching
// );

// export const selectIsCollectionLoaded = createSelector(
//   [selectShop],
//   shop => !!!shop.collections
// );
