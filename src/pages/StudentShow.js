import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';

import EditStudentModalContainer from '../containers/students/EditStudentModalContainer';
import StudentInfoTable from '../components/students/StudentInfoTable';
import NotificationContainer from '../containers/NotificationContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100vw'
  },
  indigoButton: {
    ...theme.button,
    ...theme.buttonIndigoAnimation,
    fontSize: '1em'
  }
}));

const StudentShow = ({
  student,
  courseList,
  status,
  errMessage,
  setModalOpen,
  setStudentToUpdate
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEditStudent = () => {
    setModalOpen('editStudent', true);
    setStudentToUpdate(student);
  };

  return student ? (
    <Grid container direction='row' className={classes.mainContainer}>
      <Grid
        container
        direction={matchesSM ? 'column' : 'row'}
        alignItems={matchesSM ? undefined : 'center'}
        style={{
          width: matchesSM ? '100%' : '35%',
          margin: matchesSM ? '1em 2em' : '1em 5em'
        }}
      >
        <Grid
          container
          direction='column'
          style={{ width: matchesSM ? '80%' : '30%' }}
        >
          <Grid item>
            <Typography variant='h4'>{student.fullName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' style={{ margin: '0.5em 0' }}>
              Student Profile
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ minWidth: 58 }}>
          <EditStudentModalContainer />
          <Button
            variant='outlined'
            className={classes.indigoButton}
            startIcon={<EditIcon />}
            onClick={handleEditStudent}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction={matchesSM ? 'column' : 'row'}
        style={{ width: '100%', marginTop: '1em' }}
        spacing={4}
      >
        <Grid item style={{ width: matchesSM ? '100%' : '75%' }}>
          {/* <StudentListTableContainer /> */}
        </Grid>
        <Grid item style={{ width: matchesSM ? '100%' : '25%' }}>
          {/* <CourseInfoContainer /> */}
          <StudentInfoTable student={student} courseList={courseList} />
        </Grid>
      </Grid>
      <NotificationContainer status={status} />
    </Grid>
  ) : null;
};

export default StudentShow;
