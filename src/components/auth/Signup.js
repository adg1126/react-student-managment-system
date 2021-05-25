import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  indigoButton: {
    ...theme.button,
    ...theme.buttonIndigoAnimation,
    fontSize: '1em',
    marginBottom: '1.5em',
    padding: '0.8em 2.5em',
    [theme.breakpoints.down('sm')]: {
      padding: '1em 1.8em',
      width: '85%'
    }
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

const Signup = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const { pristine, reset } = props;

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = formValues => {
    // props.onSubmit(formValues);
    console.log(formValues);
    reset();
  };

  return (
    <Grid
      container
      direction='column'
      spacing={3}
      style={{
        marginLeft: matchesMD ? '0.8em' : '2em'
      }}
    >
      <Grid item>
        <Typography variant='h5'>CREATE AN ACCOUNT</Typography>
      </Grid>
      <Grid item>
        <form
          autoComplete='off'
          className='sing-up form'
          onSubmit={props.handleSubmit(onSubmit)}
        >
          <Field
            className={classes.textField}
            name='fullName'
            component={renderTextField}
            label='Full Name'
          />
          <Field
            className={classes.textField}
            name='email'
            component={renderTextField}
            label='Email'
          />
          <Field
            className={classes.textField}
            type={showPassword ? 'text' : 'password'}
            name='password'
            component={renderTextField}
            label='Password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    disableRipple
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Field
            className={classes.textField}
            type={showPassword ? 'text' : 'password'}
            name='confirmPassword'
            component={renderTextField}
            label='Confirm Password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    disableRipple
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Grid
            container
            justify='space-between'
            direction='column'
            style={{ width: '100%', marginTop: '1.2em' }}
          >
            <Grid item>
              <Button
                type='submit'
                variant='outlined'
                className={classes.indigoButton}
                color='primary'
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const validate = values => {
  const errors = {};

  const requiredFields = ['fullName', 'email', 'password', 'confirmPassword'];

  if (values.password !== values.confirmPassword) {
    errors.password = "Password don't match";
    errors.confirmPassword = "Password don't match";
  }

  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = 'Required';
  });

  return errors;
};

export default reduxForm({
  form: 'signupForm',
  validate
})(Signup);
