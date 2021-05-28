import React from 'react';

import Modal from '../modal/Modal';
import StudentForm from './StudentForm';

const AddStudentModal = ({ open, handleClickOpen, addStudent, docId }) => {
  const onSubmit = formValues => {
    addStudent({ ...formValues, courses: [docId] });
  };

  const modalContent = {
    title: 'Student Information',
    content: () => (
      <StudentForm onSubmit={onSubmit} handleClickOpen={handleClickOpen} />
    ),
    actions: () => <></>
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default AddStudentModal;
