import React from 'react';
import moment from 'moment';

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

import TakeAttendance from '../components/attendance/TakeAttendance';

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

const Attendance = ({ courseList, studentList, attendanceCourses }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [courseId, setCourseId] = React.useState('');
  const [filteredStudents, setFilteredStudents] = React.useState([]);
  const [filteredAttendance, setFilteredAttendance] = React.useState([]);

  // const currentDate = '2018-07-17';
  const currentDate = new Date().toISOString().slice(0, 10);

  const handleChangeCourse = e => {
    setCourseId(e.target.value);
    setFilteredStudents(getStudentsForClass(e.target.value));
    setFilteredAttendance(getAttendance(e.target.value));
  };

  const getStudentsForClass = courseCode =>
    studentList.filter(student =>
      student.courses
        ? student.courses.some(course => course.includes(courseCode))
        : []
    );

  const getAttendance = courseCode => {
    const filtered = attendanceCourses.filter(course =>
      course.courseId.match(courseCode)
    );

    return filtered[0].classDates;
  };

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
          <Scheduler data={filteredAttendance.length ? filteredAttendance : []}>
            <ViewState currentDate={currentDate} />
            <MonthView />
            <Appointments />
          </Scheduler>
        </Paper>
      </Grid>
      <Grid style={{ width: matchesSM ? '90%' : '40%' }}>
        <TakeAttendance
          courseList={courseList}
          filteredStudents={filteredStudents}
          courseId={courseId}
          handleChangeCourse={handleChangeCourse}
        />
      </Grid>
    </Grid>
  ) : null;
};

export default Attendance;
