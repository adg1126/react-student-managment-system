import React, { useState, useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import AddStudentModalContainer from '../../containers/students/AddStudentModalContainer';
import StudentListContainer from '../../containers/students/StudentListContainer';
import CourseInfoContainer from '../../containers/courses/CourseInfoContainer';
import Notification from '../notification/Notification';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: '1em'
  },
  headerContainer: {
    marginBottom: '3em'
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  indigoButton: {
    ...theme.button,
    ...theme.buttonIndigoAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  addClassButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  }
}));

const CourseShow = ({
  course,
  fetchStudentsStart,
  notificationOpen,
  setNotificationOpen,
  status
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchStudentsStart();
  }, [fetchStudentsStart]);

  const [open, setModalOpen] = useState(false);

  const handleClickOpen = state => {
    setModalOpen(state);
  };

  return course ? (
    <Grid container direction='column' className={classes.mainContainer}>
      <Grid item container className={classes.headerContainer}>
        <Grid item>
          <Typography variant='h5'>{`${course.courseCode} - ${course.courseName}`}</Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <AddStudentModalContainer
            docId={course.docId}
            open={open}
            handleClickOpen={handleClickOpen}
          />
          <Button
            variant='outlined'
            className={classes.addClassButton}
            startIcon={<PersonAddIcon />}
            onClick={() => handleClickOpen(true)}
          >
            Add Student
          </Button>
        </Grid>
        <Grid item container spacing={4}>
          <Grid item style={{ width: matchesMD ? '100%' : '60%' }}>
            <StudentListContainer />
          </Grid>
          <Grid item style={{ width: matchesMD ? '100%' : '40%' }}>
            <CourseInfoContainer />
          </Grid>
        </Grid>
        <Notification
          status={status}
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
        />
      </Grid>
    </Grid>
  ) : null;
};

export default CourseShow;