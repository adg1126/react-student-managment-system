import { createSelector } from 'reselect';

const selectModal = state => state.modal;

export const selectModalOpen = modalName =>
  createSelector([selectModal], modal =>
    modal[modalName] ? modal[modalName].open : null
  );
