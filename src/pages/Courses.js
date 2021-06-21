import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';

import CourseListCardContainer from '../containers/courses/CourseListCardContainer';
import CourseListTableContainer from '../containers/courses/CourseListTableContainer';
import AddCourseModalContainer from '../containers/courses/AddCourseModalContainer';
import NotificationContainer from '../containers/NotificationContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100vw'
  },
  header: {
    marginBottom: '3em'
  },
  addCourseButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  }
}));

const Courses = ({ status, setModalOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={classes.mainContainer}
    >
      <Grid
        container
        direction='column'
        style={{ width: matchesMD ? '95%' : '80%', marginTop: '1em' }}
      >
        <Grid item className={classes.header}>
          <Typography variant='h4'>Course List</Typography>
        </Grid>
        <Grid item>
          <AddCourseModalContainer />
          <Button
            variant='outlined'
            className={classes.addCourseButton}
            startIcon={<PostAddIcon />}
            onClick={() => setModalOpen('addCourse', true)}
          >
            Add Course
          </Button>
        </Grid>
        <Grid item>
          {matchesMD ? (
            <CourseListCardContainer />
          ) : (
            <CourseListTableContainer />
          )}
        </Grid>
        <NotificationContainer status={status} />
      </Grid>
    </Grid>
  );
};

export default Courses;
