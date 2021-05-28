import React from 'react';

import Modal from '../modal/Modal';
import CourseForm from './CourseForm';

const EditCourseModal = ({ open, handleClickOpen, editCourse, docId }) => {
  const onSubmit = formValues => {
    editCourse(docId, formValues);
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

export default EditCourseModal;
