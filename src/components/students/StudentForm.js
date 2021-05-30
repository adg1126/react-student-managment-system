import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textField: {
    '& label.Mui-focused': {
      color: 'blue'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.common.grey800
      },
      '&:hover fieldset': {
        borderColor: theme.palette.common.grey800
      },
      '&.Mui-focused fieldset': {
        borderColor: 'blue'
      }
    },
    margin: '0.5em 0'
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
      },
      '& .MuiFormLabel-root': {
        color: 'none'
      }
    }
  },
  buttonContainer: {
    width: '40%',
    marginTop: '1.5em',
    [theme.breakpoints.down('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
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

const SelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  const classes = useStyles();

  return (
    <FormControl
      style={{ marginTop: '0.5em' }}
      classes={{
        root: classes.formControl
      }}
      variant='outlined'
      error={touched && error}
      fullWidth
    >
      <InputLabel>{label}</InputLabel>
      <Select {...input} {...custom} onChange={value => input.onChange(value)}>
        {children}
      </Select>
      <FormHelperText>{touched && error}</FormHelperText>
    </FormControl>
  );
};

const StudentForm = props => {
  const classes = useStyles();

  const { pristine, reset, handleClickOpen, studentList } = props;

  const onSubmit = formValues => {
    props.onSubmit(formValues);
    reset();
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Grid container direction='column' spacing={2}>
        <Grid item container direction='column'>
          <Grid item>
            <Typography>Add a new student</Typography>
          </Grid>
          <Grid item>
            <Field
              name='fullName'
              variant='outlined'
              component={renderTextField}
              label='Full Name'
              className={classes.textField}
            />
          </Grid>
        </Grid>
        {studentList.length ? (
          <Grid item container direction='column'>
            <Grid item>
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
      <Grid
        container
        justify={handleClickOpen ? 'space-between' : undefined}
        className={classes.buttonContainer}
      >
        <Grid item>
          <Button
            variant='outlined'
            className={classes.redButton}
            onClick={() => handleClickOpen(false)}
            color='primary'
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
  form: 'studentForm',
  validate
})(StudentForm);
