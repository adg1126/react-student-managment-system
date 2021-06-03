import React from 'react';

import Modal from '../modal/Modal';
import StudentForm from './StudentForm';

const EditStudentModal = ({ editStudent, setModalOpen, studentToUpdate }) => {
  const onSubmit = formValues => {
    editStudent(studentToUpdate.docId, { ...formValues });
    setModalOpen('editStudent', false);
  };

  const modalContent = {
    title: 'Edit Student Information',
    content: (
      <StudentForm
        onSubmit={onSubmit}
        initialValues={studentToUpdate}
        setModalOpen={setModalOpen}
        modalName='editStudent'
      />
    ),
    actions: <></>
  };

  return <Modal {...modalContent} modalName='editStudent' />;
};

export default EditStudentModal;
