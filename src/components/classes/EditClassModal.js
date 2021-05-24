import React from 'react';

import Modal from '../modal/Modal';
import ClassForm from './ClassForm';

const EditClassModal = ({ open, handleClickOpen, editClass, docId }) => {
  const onSubmit = formValues => {
    editClass(docId, formValues);
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
