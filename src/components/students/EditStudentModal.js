import React from 'react';

import ModalContainer from '../../containers/ModalContainer';
import StudentForm from './StudentForm';

const EditStudentModal = ({
  editStudentStart,
  setModalOpen,
  studentToUpdate
}) => {
  const onSubmit = formValues => {
    editStudentStart(studentToUpdate.docId, { ...formValues });
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

  return <ModalContainer {...modalContent} modalName='editStudent' />;
};

export default EditStudentModal;
