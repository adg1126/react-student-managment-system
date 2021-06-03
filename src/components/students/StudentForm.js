import React from 'react';
import history from '../../history';
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
import Typography from '@material-ui/core/Typography';

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
            className={classes.textField}
            variant='outlined'
            name='fullName'
            component={renderTextField}
            label='Full Name'
          />
        </Grid>
        {studentList && history.location.pathname !== '/students' ? (
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
