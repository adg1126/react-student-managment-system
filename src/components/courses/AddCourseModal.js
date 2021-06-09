import React from 'react';

import ModalContainer from '../../containers/ModalContainer';
import CourseForm from './CourseForm';

const AddCourseModal = ({ addCourse, setModalOpen }) => {
  const onSubmit = formValues => {
    addCourse(formValues);
  };

  const modalContent = {
    title: 'Course Information',
    content: (
      <CourseForm
        onSubmit={onSubmit}
        setModalOpen={setModalOpen}
        modalName='addCourse'
      />
    ),
    actions: <></>
  };

  return <ModalContainer {...modalContent} modalName='addCourse' />;
};

export default AddCourseModal;
