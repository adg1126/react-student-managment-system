import { SET_MODAL_OPEN } from './modalActionsTypes';

const INITIAL_STATE = {
  addCourse: { open: false },
  deleteCourse: { open: false },
  editCourse: { open: false },
  addStudent: { open: false },
  deleteStudent: { open: false },
  editStudent: { open: false }
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MODAL_OPEN:
      return {
        ...state,
        [action.key]: { open: action.value }
      };
    default:
      return state;
  }
};

export default modalReducer;
