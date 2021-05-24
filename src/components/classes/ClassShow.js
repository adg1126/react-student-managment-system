import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import ClassInfo from './ClassInfo';
import AddStudentModalContainer from '../../containers/AddStudentModalContainer';
import StudentListContainer from '../../containers/StudentListContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    margin: '1em'
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

const ClassShow = ({ classObj }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setModalOpen] = useState(false);

  const handleClickOpen = state => {
    setModalOpen(state);
  };

  return classObj ? (
    <Grid container direction='column' className={classes.mainContainer}>
      <Grid item container className={classes.headerContainer}>
        <Grid item>
          <Typography variant='h5'>{`${classObj.courseCode}-${classObj.courseName}`}</Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <AddStudentModalContainer
            courseCode={classObj.courseCode}
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
            <StudentListContainer
              courseCode={classObj.courseCode}
              students={classObj.students}
            />
          </Grid>
          <Grid item style={{ width: matchesMD ? '100%' : '40%' }}>
            <ClassInfo classObj={classObj} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

export default ClassShow;
