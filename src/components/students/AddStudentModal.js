import React from 'react';

import Modal from '../modal/Modal';
import StudentForm from './StudentForm';

const AddStudentModal = ({ open, handleClickOpen, addClass }) => {
  const onSubmit = formValues => {
    const { courseCode, courseName, units } = formValues;
    addClass({ courseCode, courseName, units });
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
