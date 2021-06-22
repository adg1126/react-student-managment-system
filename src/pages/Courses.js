import React from 'react';
import history from '../history';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

import ReusableCard from '../components/ReusableCard';
import DeleteCourseModalContainer from '../containers/courses/DeleteCourseModalContainer';
import EditCourseModalContainer from '../containers/courses/EditCourseModalContainer';
import AddCourseModalContainer from '../containers/courses/AddCourseModalContainer';
import NotificationContainer from '../containers/NotificationContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100vw'
  },
  header: {
    marginBottom: '3em'
  },
  greenButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em'
  },
  indigoButton: {
    ...theme.button,
    ...theme.buttonIndigoAnimation,
    fontSize: '1em'
  }
}));

const CourseCard = ({ course, students, setModalOpen, setCurrentCourse }) => {
  const classes = useStyles();

  const handleDeleteCourse = () => {
    setModalOpen('deleteCourse', true);
    setCurrentCourse(course);
  };

  const handleEditCourse = () => {
    setModalOpen('editCourse', true);
    setCurrentCourse(course);
  };

  const { docId, courseCode, courseName } = course;

  const cardContent = {
    header: (
      <Typography
        variant='h5'
        onClick={() => history.push(`/courses/${docId}`)}
      >
        {`${courseCode} - ${courseName}`}
      </Typography>
    ),
    content: (
      <Typography variant='body1'>
        {`Total Students: ${students.length || 0}`}
      </Typography>
    ),
    actions: (
      <>
        <DeleteCourseModalContainer />
        <EditCourseModalContainer />
        <Button
          variant='outlined'
          className={classes.redButton}
          startIcon={<HighlightOffIcon />}
          onClick={handleDeleteCourse}
        >
          Remove
        </Button>
        <Button
          variant='outlined'
          className={classes.indigoButton}
          startIcon={<EditIcon />}
          onClick={handleEditCourse}
        >
          Edit
        </Button>
      </>
    )
  };

  return <ReusableCard {...cardContent} />;
};

const Courses = ({
  status,
  studentList,
  courseList,
  errMessage,
  setModalOpen,
  setCurrentCourse
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

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
        style={{ width: matchesSM ? '95%' : '40%', marginTop: '1em' }}
      >
        <Grid item className={classes.header}>
          <Typography variant='h4'>Course List</Typography>
        </Grid>
        <Grid item>
          <AddCourseModalContainer />
          <Button
            variant='outlined'
            className={classes.greenButton}
            startIcon={<PostAddIcon />}
            onClick={() => setModalOpen('addCourse', true)}
          >
            Add Course
          </Button>
        </Grid>
        {courseList.length ? (
          courseList.map((course, i) => (
            <Grid item key={i}>
              <CourseCard
                course={course}
                students={studentList.filter(student =>
                  student.courses
                    ? student.courses.some(c => c.includes(course.docId))
                    : []
                )}
                setModalOpen={setModalOpen}
                setCurrentCourse={setCurrentCourse}
              />
            </Grid>
          ))
        ) : errMessage ? (
          <Grid item>
            <Typography variant='h4' style={{ color: 'red' }}>
              {errMessage}
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography>
              You currently have no classes, add some now.
            </Typography>
          </Grid>
        )}
        <NotificationContainer status={status} />
      </Grid>
    </Grid>
  );
};

export default Courses;
