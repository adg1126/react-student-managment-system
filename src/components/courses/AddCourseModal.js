import React from 'react';

import Modal from '../modal/Modal';
import CourseForm from './CourseForm';

const AddCourseModal = ({ open, handleClickOpen, addCourse }) => {
  const onSubmit = formValues => {
    addCourse(formValues);
  };

  const modalContent = {
    title: 'Course Information',
    content: () => (
      <CourseForm onSubmit={onSubmit} handleClickOpen={handleClickOpen} />
    ),
    actions: () => <></>
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default AddCourseModal;
