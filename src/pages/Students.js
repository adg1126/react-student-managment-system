import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import AddStudentModalContainer from '../containers/students/AddStudentModalContainer';

import NotificationContainer from '../containers/NotificationContainer';
import StudentListContainer from '../containers/students/StudentListContainer';

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
    <Grid container className={classes.mainContainer} direction='column'>
      <Grid item container className={classes.headerContainer}>
        <Grid item>
          <Typography variant='h4'>Students List</Typography>
        </Grid>
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
          style={{ width: matchesMD ? '100%' : '80%', marginTop: '1em' }}
        >
          <StudentListContainer />
        </Grid>
      </Grid>
      <NotificationContainer status={status} />
    </Grid>
  );
};

export default Students;
