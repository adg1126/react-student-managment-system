import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import StudentListContainer from '../../containers/attendance/StudentListContainer';
import ConvertToExcelContainer from '../../containers/attendance/ConvertToExcelContainer';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  buttonContainer: {
    marginTop: '1.5em'
  },
  greenButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em'
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em',
    marginRight: '1em'
  }
}));

const TakeAttendance = ({
  courseList,
  currentCourse,
  currentDate,
  setCurrentCourse
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChangeCourse = e => {
    setCurrentCourse(e.target.value);
  };

  return (
    <Grid container direction='column' spacing={3}>
      <Grid
        item
        container
        direction='row'
        alignItems='center'
        spacing={matchesXS ? undefined : 3}
      >
        <Grid item>
          <Typography variant='body1'>Attendance for</Typography>
        </Grid>
        <Grid item>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel>Course</InputLabel>
            <Select
              value={
                currentCourse && !_.isEmpty(currentCourse)
                  ? currentCourse.courseCode
                  : ''
              }
              onChange={handleChangeCourse}
              label='Course'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {courseList.map(({ courseCode }) => (
                <MenuItem key={courseCode} value={courseCode}>
                  {courseCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {!_.isEmpty(currentCourse) ? (
        <Grid item>
          <ConvertToExcelContainer />
        </Grid>
      ) : null}
      <Grid
        item
        container
        direction='row'
        alignItems='center'
        spacing={matchesXS ? undefined : 3}
      >
        <Grid item>
          {!_.isEmpty(currentDate) && (
            <Typography variant='body1'>{`On ${
              !_.isEmpty(currentDate) &&
              moment(currentDate.startDate).format('llll')
            }`}</Typography>
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item container direction='column' spacing={3}>
        <StudentListContainer />
      </Grid>
    </Grid>
  );
};

export default TakeAttendance;
