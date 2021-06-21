import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import SelectField from '../fields/SelectField';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    margin: '1em 0'
  },
  greenButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    margin: '1em'
  }
}));

const StudentList = ({
  currentCourse,
  courseStudents,
  updateStudentAttendanceStatusStart,
  handleSubmit,
  pristine
}) => {
  const classes = useStyles();

  const onSubmit = formValues => {
    updateStudentAttendanceStatusStart(currentCourse.docId, formValues);
  };

  return courseStudents && courseStudents.length ? (
    <Grid container direction='column' style={{ padding: '0 1em' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {courseStudents.map((student, i) => (
          <Grid
            key={i}
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item>
              <Typography variant='body1'>{student.fullName}</Typography>
            </Grid>
            <Grid item style={{ margin: '1em' }}>
              <Field
                name={`${student.docId}.status`}
                component={SelectField}
                label='Status'
                fullWidth
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {['Present', 'Absent', 'Excused'].map((status, i) => (
                  <MenuItem key={i} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
          </Grid>
        ))}
        <Grid
          container
          direction='row'
          justify='flex-end'
          className={classes.buttonContainer}
        >
          <Grid item>
            <Button
              disabled={pristine}
              type='submit'
              variant='outlined'
              className={classes.greenButton}
              color='primary'
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  ) : null;
};

const mapStateToProps = (state, ownProps) => ({
  initialValues: Object.fromEntries(
    ownProps.courseStudents.map(s => [s.docId, { status: s.attendanceStatus }])
  )
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'studentAttendance',
    enableReinitialize: true
  })(StudentList)
);
