import React from 'react';

import Modal from '../modal/Modal';
import ClassForm from './ClassForm';

const AddCourseModal = ({ open, handleClickOpen, addCourse }) => {
  const onSubmit = formValues => {
    addCourse(formValues);
  };

  const modalContent = {
    title: 'Course Information',
    content: () => (
      <ClassForm onSubmit={onSubmit} handleClickOpen={handleClickOpen} />
    ),
    actions: () => <></>
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default AddCourseModal;
