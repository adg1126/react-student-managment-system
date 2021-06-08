import React, { useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui';

import TakeAttendanceContainer from '../containers/attendance/TakeAttendanceContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: '1em',
    width: '100%'
  },
  formControl: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.grey800
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.grey800
    },
    '& .Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'blue'
      }
    },
    '& label.Mui-focused': {
      color: 'blue'
    }
  },
  greyButton: {
    ...theme.button
  }
}));

const Attendance = ({
  courseList,
  currentCourse,
  fetchAttendanceForCourse,
  studentList,
  attendanceForCourseClassDates
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchAttendanceForCourse(currentCourse);
  }, [fetchAttendanceForCourse, currentCourse]);

  return courseList && studentList ? (
    <Grid
      className={classes.mainContainer}
      container
      direction={matchesSM ? 'column' : 'row'}
      alignItems='flex-start'
      spacing={3}
    >
      <Grid item style={{ width: matchesSM ? '90%' : '60%' }}>
        <Paper>
          <Scheduler data={attendanceForCourseClassDates}>
            <ViewState currentDate={new Date().toISOString().slice(0, 10)} />
            <MonthView />
            <Appointments />
          </Scheduler>
        </Paper>
      </Grid>
      <Grid style={{ width: matchesSM ? '90%' : '40%' }}>
        <TakeAttendanceContainer />
      </Grid>
    </Grid>
  ) : null;
};

export default Attendance;
