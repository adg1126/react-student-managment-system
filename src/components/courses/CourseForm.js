import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import SwitchGroup from '../SwitchGroup';

const useStyles = makeStyles(theme => ({
  textField: {
    '& label.Mui-focused': {
      color: 'blue'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'blue'
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

const CourseForm = props => {
  const classes = useStyles();

  const { pristine, reset, setModalOpen, modalName } = props;

  const onSubmit = formValues => {
    props.onSubmit(formValues);
    reset();
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Field
        className={classes.textField}
        variant='outlined'
        name='courseCode'
        component={renderTextField}
        label='Course Code'
      />
      <Field
        className={classes.textField}
        variant='outlined'
        name='courseName'
        component={renderTextField}
        label='Course Name'
      />
      <FormGroup style={{ margin: '1em 0' }}>
        <FormLabel style={{ color: 'black', margin: '0.5em 0' }}>
          Meeting Days
        </FormLabel>
        <Field
          name='meetingDays'
          component={SwitchGroup}
          options={[
            { id: 1, name: 'monday' },
            { id: 2, name: 'tuesday' },
            { id: 3, name: 'wednesday' },
            { id: 4, name: 'thursday' },
            { id: 5, name: 'friday' },
            { id: 6, name: 'saturday' },
            { id: 7, name: 'sunday' }
          ]}
        />
      </FormGroup>
      <Grid container className={classes.buttonContainer}>
        <Grid item>
          {setModalOpen ? (
            <Button
              variant='outlined'
              className={classes.redButton}
              onClick={() => setModalOpen(modalName, false)}
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

  const requiredFields = ['courseCode', 'courseName'];
  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = 'Required';
  });

  return errors;
};

export default reduxForm({
  form: 'courseForm',
  validate
})(CourseForm);
