import React from 'react';
import history from '../../history';
import { Field, reduxForm } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Textfield from '../fields/Textfield';
import SelectField from '../fields/SelectField';

const useStyles = makeStyles(theme => ({
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

const StudentForm = props => {
  const classes = useStyles();

  const { pristine, reset, setModalOpen, modalName, studentList } = props;

  const onSubmit = formValues => {
    props.onSubmit(formValues);
    reset();
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Field
            name='fullName'
            component={Textfield}
            label='Full Name'
            fullWidth
          />
        </Grid>
        {studentList && history.location.pathname !== '/students' ? (
          <Grid item container direction='column'>
            <Grid item style={{ margin: '0.5em 0' }}>
              <Typography>Or add an existing student</Typography>
            </Grid>
            <Grid item>
              <Field
                name='existingStudent'
                component={SelectField}
                label='Existing Students'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {studentList.map((student, i) => (
                  <MenuItem key={i} value={student}>
                    {student.fullName}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <Grid container direction='row' className={classes.buttonContainer}>
        <Grid item>
          <Button
            variant='outlined'
            className={classes.redButton}
            onClick={() => setModalOpen(modalName, false)}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={pristine}
            type='submit'
            variant='outlined'
            className={classes.greenButton}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default reduxForm({
  form: 'studentForm'
})(StudentForm);
