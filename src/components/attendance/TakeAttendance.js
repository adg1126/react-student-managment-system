import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SelectField from '../fields/SelectField';

const TakeAttendance = ({ courseList, filteredStudents, setCurrentCourse }) => {
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
            <Typography variant='body1' gutterBottom>
              Attendance for
            </Typography>
          </Grid>
          <Grid item>
            <SelectField
              options={courseList.map(course => ({
                value: course.docId,
                name: course.courseCode
              }))}
              handleChange={handleChangeCourse}
            />
          </Grid>
          <Grid>
            {/* <FormControl
          style={{ width: '10em' }}
          className={classes.formControl}
          variant='outlined'
          margin='dense'
        >
          <InputLabel>Mark all as</InputLabel>
          <Select value={course} onChange={handleChange}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {['Presen', 'Absent'].map((status, i) => (
              <MenuItem key={i} value={i}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid
          item
          container
          direction='column'
          spacing={3}
          style={{ width: '70%' }}
        >
          {filteredStudents.length
            ? filteredStudents.map((student, i) => (
                <Grid
                  key={i}
                  item
                  container
                  direction='row'
                  justify='space-between'
                >
                  <Grid item>
                    <Typography variant='body1'>{student.fullName}</Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TakeAttendance;
