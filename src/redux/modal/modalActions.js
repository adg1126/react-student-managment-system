import { SET_MODAL_OPEN } from './modalActionsTypes';

export const setModalOpen = (modal, modalOpen) => ({
  type: SET_MODAL_OPEN,
  key: modal,
  value: modalOpen
});
