import React from 'react';
import history from '../../history';

import ModalContainer from '../../containers/ModalContainer';
import StudentForm from './StudentForm';

const AddStudentModal = ({
  addStudentStart,
  setModalOpen,
  addExistingStudentToCourseStart,
  course,
  studentList
}) => {
  const onSubmit = formValues => {
    formValues.existingStudent && history.location.pathname !== '/students'
      ? addExistingStudentToCourseStart(
          formValues.existingStudent.docId,
          course.docId
        )
      : history.location.pathname !== '/students'
      ? addStudentStart({ ...formValues, courses: [course.docId] })
      : addStudentStart({ ...formValues, courses: [] });
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
