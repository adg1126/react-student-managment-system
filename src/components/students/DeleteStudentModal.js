import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Modal from '../modal/Modal';

const useStyles = makeStyles(theme => ({
  buttonContainer: { padding: '0 1em' },
  greenButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  }
}));
const DeleteStudentModal = ({
  open,
  handleClickOpen,
  deleteStudent,
  deleteStudentFromCourse,
  course,
  student
}) => {
  const classes = useStyles();

  const handleClick = () => {
    course
      ? deleteStudentFromCourse({ ...student, courseToDelete: course.docId })
      : deleteStudent();
  };

  const modalContent = {
    title: course
      ? `Remove Student from ${course.courseCode} - ${course.courseName}`
      : 'Remove Student',
    content: () => (
      <>
        <DialogContentText>
          This action will only delete the student from this course the student.
        </DialogContentText>
        <DialogContentText>
          To permanently delete the student delete the student. Delete the
          student from the students tab.
        </DialogContentText>
      </>
    ),
    actions: () => (
      <Grid className={classes.buttonContainer} container direction='row'>
        <Grid item>
          <Button
            variant='outlined'
            className={classes.redButton}
            onClick={() => handleClickOpen(false)}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item style={{ marginLeft: '1em' }}>
          <Button
            variant='outlined'
            className={classes.greenButton}
            onClick={handleClick}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    )
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default DeleteStudentModal;
