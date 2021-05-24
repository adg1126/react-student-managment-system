import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  textField: {
    '& label.Mui-focused': {
      color: 'blue'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'blue'
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: theme.palette.common.grey
    },
    '& .MuiFormLabel-root': { color: 'black' },
    width: '100%',
    margin: '0.5em 0'
  },
  greenButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  }
}));

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
    margin='dense'
    fullWidth
  />
);

const StudentForm = props => {
  const classes = useStyles();

  const { pristine, reset, handleClickOpen } = props;

  const onSubmit = formValues => {
    props.onSubmit(formValues);
    reset();
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Field name='fullName' component={renderTextField} label='Full Name' />
      <Grid
        container
        justify={handleClickOpen ? 'space-between' : undefined}
        style={{ width: '100%', marginTop: '1.2em' }}
      >
        <Grid item>
          {handleClickOpen ? (
            <Button
              variant='outlined'
              className={classes.redButton}
              onClick={() => handleClickOpen(false)}
              color='primary'
            >
              Cancel
            </Button>
          ) : null}
        </Grid>
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
  );
};

const validate = values => {
  const errors = {};

  const requiredFields = ['courseCode', 'courseName', 'units'];
  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = 'Required';
  });

  return errors;
};

export default reduxForm({
  form: 'classForm',
  validate
})(StudentForm);
