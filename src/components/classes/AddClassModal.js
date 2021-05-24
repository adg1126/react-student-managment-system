import React from 'react';

import Modal from '../modal/Modal';
import ClassForm from './ClassForm';

const AddClassModal = ({ open, handleClickOpen, addClass }) => {
  const onSubmit = formValues => {
    const { courseCode, courseName } = formValues;
    addClass({ courseCode, courseName });
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

export default AddClassModal;
