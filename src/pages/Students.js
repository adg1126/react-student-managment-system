import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import AddStudentModalContainer from '../containers/students/AddStudentModalContainer';

import NotificationContainer from '../containers/NotificationContainer';
import StudentListTableContainer from '../containers/students/StudentListTableContainer';
import StudentListCardContainer from '../containers/students/StudentListCardContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100vw'
  },
  header: {
    marginBottom: '3em'
  },
  addClassButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  }
}));

const Students = ({ status, setModalOpen }) => {
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
          <Typography variant='h4'>Students List</Typography>
        </Grid>
        <Grid item container direction='column'>
          <Grid item>
            <AddStudentModalContainer />
            <Button
              variant='outlined'
              className={classes.addClassButton}
              startIcon={<PersonAddIcon />}
              onClick={() => setModalOpen('addStudent', true)}
            >
              Add Student
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction='column'>
          <Grid
            item
            style={{ width: matchesMD ? '95%' : '80%', marginTop: '1em' }}
          >
            {matchesMD ? (
              <StudentListCardContainer />
            ) : (
              <StudentListTableContainer />
            )}
          </Grid>
        </Grid>
        <NotificationContainer status={status} />
      </Grid>
    </Grid>
  );
};

export default Students;
