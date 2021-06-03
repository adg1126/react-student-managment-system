import React from 'react';
import history from '../../history';

import ModalContainer from '../../containers/ModalContainer';
import StudentForm from './StudentForm';

const AddStudentModal = ({
  addStudent,
  setModalOpen,
  addExistingStudentToCourse,
  course,
  studentList
}) => {
  const onSubmit = formValues => {
    formValues.existingStudent && history.location.pathname !== '/students'
      ? addExistingStudentToCourse(
          formValues.existingStudent.docId,
          course.docId
        )
      : history.location.pathname !== '/students'
      ? addStudent({ ...formValues, courses: [course.docId] })
      : addStudent({ ...formValues, courses: [] });
  };

  const modalContent = {
    title: course
      ? `Add Student to ${course.courseCode} - ${course.courseName}`
      : 'Student Information',
    content: (
      <StudentForm
        onSubmit={onSubmit}
        setModalOpen={setModalOpen}
        studentList={studentList}
        modalName='addStudent'
      />
    ),
    actions: <></>
  };

  return <ModalContainer {...modalContent} modalName='addStudent' />;
};

export default AddStudentModal;
