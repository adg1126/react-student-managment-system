import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ModalContainer from '../../containers/ModalContainer';

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

const DeleteCourseModal = ({ courseToUpdate, deleteCourse, setModalOpen }) => {
  const classes = useStyles();

  const handleClick = () => {
    deleteCourse(courseToUpdate.docId);
    setModalOpen('deleteCourse', false);
  };

  const modalContent = {
    title: courseToUpdate
      ? `Delete ${courseToUpdate.courseCode} - ${courseToUpdate.courseName}`
      : null,
    content: (
      <DialogContentText>
        This action will delete the course delete and all of the student data
        associated this course.
      </DialogContentText>
    ),
    actions: (
      <Grid className={classes.buttonContainer} container direction='row'>
        <Grid item>
          <Button
            variant='outlined'
            className={classes.redButton}
            onClick={() => setModalOpen('deleteCourse', false)}
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

  return <ModalContainer {...modalContent} modalName='deleteCourse' />;
};

export default DeleteCourseModal;
