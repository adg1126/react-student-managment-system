import React from 'react';

import Modal from '../modal/Modal';
import StudentForm from './StudentForm';

const AddStudentModal = ({
  open,
  handleClickOpen,
  addStudent,
  addExistingStudentToCourse,
  course,
  studentList
}) => {
  const onSubmit = formValues => {
    formValues.existingStudent
      ? addExistingStudentToCourse({
          ...formValues.existingStudent,
          courses: [course.docId]
        })
      : addStudent({ ...formValues, courses: [course.docId] });
  };

  const modalContent = {
    title: course
      ? `Add Student to ${course.courseCode} - ${course.courseName}`
      : 'Student Information',
    content: () => (
      <StudentForm
        onSubmit={onSubmit}
        handleClickOpen={handleClickOpen}
        studentList={studentList}
      />
    ),
    actions: () => <></>
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default AddStudentModal;
