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
    margin: '1em',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 10
    }
  },
  headerContainer: {
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
    <Grid container className={classes.mainContainer} direction='column'>
      <Grid item container className={classes.headerContainer}>
        <Grid item>
          <Typography variant='h4'>Course List</Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
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
        <Grid
          item
          style={{ width: matchesMD ? '100%' : '80%', marginTop: '1em' }}
        >
          {matchesMD ? (
            <CourseListCardContainer />
          ) : (
            <CourseListTableContainer />
          )}
        </Grid>
      </Grid>
      <NotificationContainer status={status} />
    </Grid>
  );
};

export default Courses;
