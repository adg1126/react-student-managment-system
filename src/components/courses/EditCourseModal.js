import React from 'react';

import Modal from '../modal/Modal';
import CourseForm from './CourseForm';

const EditCourseModal = ({ open, handleClickOpen, editCourse, course }) => {
  const onSubmit = formValues => {
    editCourse(course.docId, formValues);
  };

  const modalContent = {
    title: 'Course Information',
    content: () => (
      <CourseForm
        onSubmit={onSubmit}
        initialValues={course}
        handleClickOpen={handleClickOpen}
      />
    ),
    actions: () => <></>
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default EditCourseModal;
