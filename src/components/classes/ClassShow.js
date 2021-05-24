import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import ClassEditContiner from '../../containers/ClassEditContiner';
import AddStudentModalContainer from '../../containers/AddStudentModalContainer';
import StudentListContainer from '../../containers/StudentListContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    margin: '1em'
  },
  headerContainer: {
    marginBottom: '3em'
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
      <Grid item container direction={matchesMD ? 'column' : 'row'}>
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
          <Grid item style={{ width: matchesMD ? '100%' : '70%' }}>
            <StudentListContainer
              courseCode={classObj.courseCode}
              students={classObj.students}
            />
          </Grid>
        </Grid>
        <Grid item container direction='column'>
          <Grid item>
            <Card>
              <Typography variant='body1'>General Info</Typography>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

export default ClassShow;
