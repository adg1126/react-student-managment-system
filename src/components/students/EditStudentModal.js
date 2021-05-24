import React from 'react';

import Modal from '../modal/Modal';
import StudentForm from './StudentForm';

const EditStudentModal = ({
  open,
  handleClickOpen,
  editStudent,
  courseCode
}) => {
  const onSubmit = formValues => {
    console.log(formValues);
    // editStudent(courseCode, formValues);
  };

  const modalContent = {
    title: 'Edit Student Information',
    content: () => (
      <StudentForm onSubmit={onSubmit} handleClickOpen={handleClickOpen} />
    ),
    actions: () => <></>
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default EditStudentModal;
