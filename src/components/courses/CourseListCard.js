import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import DeleteCourseModalContainer from '../../containers/courses/DeleteCourseModalContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%'
  },
  cardContainer: {
    border: `1px solid ${theme.palette.common.grey600}`,
    padding: '0.5em 0'
  },
  cardContent: {
    cursor: 'pointer',
    '&:hover': {
      color: 'blue'
    }
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
  },
  linkButton: {
    color: theme.palette.secondary.main,
    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    zIndex: 1,
    '&:hover': {
      color: theme.palette.secondary.light,
      borderBottom: `1px solid ${theme.palette.secondary.light}`,
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  }
}));

const CourseCard = course => {
  const classes = useStyles();

  const [openDeleteCourseModal, setDeleteCourseModalOpen] = useState(false);

  const handleClickDeleteCourseModalOpen = state => {
    setDeleteCourseModalOpen(state);
  };

  const { docId, courseCode, courseName } = course;

  return (
    <Card className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <Typography
          variant='body1'
          component='h2'
          onClick={() => history.push(`/courses/${docId}`)}
        >
          {`${courseCode} - ${courseName}`}
        </Typography>
      </CardContent>
      <CardActions>
        <DeleteCourseModalContainer
          open={openDeleteCourseModal}
          handleClickOpen={handleClickDeleteCourseModalOpen}
          course={course}
        />
        <Button
          variant='outlined'
          className={classes.redButton}
          startIcon={<HighlightOffIcon />}
          onClick={() => handleClickDeleteCourseModalOpen(true)}
        >
          Remove
        </Button>
        <Button
          variant='outlined'
          className={classes.indigoButton}
          startIcon={<EditIcon />}
          component={Link}
          to={`/courses/${docId}`}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

const CourseListCard = ({ courseList, deleteCourse, errMessage }) => {
  const classes = useStyles();

  return courseList.length ? (
    <Grid
      container
      direction='column'
      spacing={3}
      className={classes.mainContainer}
    >
      {courseList.map((course, i) => (
        <Grid item key={i}>
          <CourseCard {...course} deleteCourse={deleteCourse} />
        </Grid>
      ))}
    </Grid>
  ) : errMessage ? (
    <Typography variant='h4' style={{ color: 'red' }}>
      {errMessage}
    </Typography>
  ) : (
    <Typography>You currently have no classes, add some now.</Typography>
  );
};

export default CourseListCard;
