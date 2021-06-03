import React from 'react';

import ModalContainer from '../../containers/ModalContainer';
import CourseForm from './CourseForm';

const EditCourseModal = ({ editCourse, courseToUpdate, setModalOpen }) => {
  const onSubmit = formValues => {
    editCourse(courseToUpdate.docId, formValues);
    setModalOpen('editCourse', false);
  };

  const modalContent = {
    title: courseToUpdate
      ? `Edit ${courseToUpdate.courseCode} - ${courseToUpdate.courseName}`
      : null,
    content: (
      <CourseForm
        onSubmit={onSubmit}
        initialValues={courseToUpdate}
        setModalOpen={setModalOpen}
        modalName='editCourse'
      />
    ),
    actions: <></>
  };

  return <ModalContainer {...modalContent} modalName='editCourse' />;
};

export default EditCourseModal;
