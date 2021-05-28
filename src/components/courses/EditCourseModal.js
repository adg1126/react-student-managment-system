import React from 'react';

import Modal from '../modal/Modal';
import ClassForm from './ClassForm';

const EditCourseModal = ({ open, handleClickOpen, editClass, docId }) => {
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

export default EditCourseModal;
