import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import SwitchGroup from '../fields/SwitchGroup';

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
  />
);

const DaysMeetAndTime = ({ daysMeet, input }) => {
  const classes = useStyles();

  return [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ].map((day, i) => (
    <Grid
      key={i}
      style={{
        visibility: daysMeet && daysMeet.includes(day) ? 'visible' : 'hidden'
      }}
      container
      direction='row'
      spacing={3}
      justify='center'
    >
      <Grid item>
        <Field
          className={classes.textField}
          variant='outlined'
          name={`${input.name}.${day}.startTime`}
          component={renderTextField}
          label='Start Time'
          type='time'
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min
          }}
        />
      </Grid>
      <Grid item>
        <Field
          className={classes.textField}
          variant='outlined'
          name={`${input.name}.${day}.endTime`}
          component={renderTextField}
          label='End Time'
          type='time'
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            step: 300 // 5 min
          }}
        />
      </Grid>
    </Grid>
  ));
};

let CourseForm = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const { pristine, reset, setModalOpen, modalName, daysMeet } = props;

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
        fullWidth
      />
      <Field
        className={classes.textField}
        variant='outlined'
        name='courseName'
        component={renderTextField}
        label='Course Name'
        fullWidth
      />
      <Field
        style={{ marginRight: '2em' }}
        className={classes.textField}
        variant='outlined'
        name='courseDates.startDate'
        component={renderTextField}
        label='Start Date'
        type='date'
        InputLabelProps={{
          shrink: true
        }}
      />
      <Field
        className={classes.textField}
        variant='outlined'
        name='courseDates.endDate'
        component={renderTextField}
        label='End Date'
        type='date'
        InputLabelProps={{
          shrink: true
        }}
      />
      {matchesXS ? null : (
        <Grid container direction='row' justify='space-between'>
          <Grid item container style={{ width: '28%' }}>
            <FormGroup style={{ margin: '1em 0' }}>
              <FormLabel style={{ color: 'black', margin: '0.5em 0' }}>
                Meeting Days
              </FormLabel>
              <Field
                name='daysMeet'
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
          </Grid>
          <Grid item container style={{ width: '72%', marginTop: '4em' }}>
            <Field
              name='daysMeetAndTime'
              component={DaysMeetAndTime}
              daysMeet={daysMeet}
            />
          </Grid>
        </Grid>
      )}
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

  const requiredFields = ['courseCode', 'courseName', 'courseDates'];
  requiredFields.forEach(field => {
    if (field !== 'courseDates') {
      if (!values[field]) errors[field] = 'Required';
    } else {
      errors[field] = {};
      if (!values[field]) errors[field]['startDate'] = 'Required';
      if (!values[field]) errors[field]['endDate'] = 'Required';
    }
  });

  return errors;
};

const selector = formValueSelector('courseForm');

const mapStateToProps = state => ({
  daysMeet: selector(state, 'daysMeet')
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'courseForm',
    validate
  })(CourseForm)
);
