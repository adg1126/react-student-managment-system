import React from 'react';
import _ from 'lodash';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import StudentListContainer from '../../containers/attendance/StudentListContainer';

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

const TakeAttendance = ({ courseList, currentCourse, setCurrentCourse }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const handleChangeCourse = e => {
    setCurrentCourse(e.target.value);
  };

  return (
    <Paper style={{ padding: '1em' }}>
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
        <Grid item>
          <Divider />
        </Grid>
        <Grid item container direction='column' spacing={3}>
          <StudentListContainer />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TakeAttendance;
