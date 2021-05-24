import React from 'react';

import Modal from '../modal/Modal';
import ClassForm from './ClassForm';

const EditClassModal = ({ open, handleClickOpen, editClass }) => {
  const onSubmit = formValues => {
    const { courseCode, courseName } = formValues;
    editClass({ courseCode, courseName });
  };

  const modalContent = {
    title: 'Class Information',
    content: () => (
      <ClassForm onSubmit={onSubmit} handleClickOpen={handleClickOpen} />
    ),
    actions: () => <></>
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default EditClassModal;
