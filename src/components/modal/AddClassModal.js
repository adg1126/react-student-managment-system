import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Modal from './Modal';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    margin: '1em'
  },
  headerContainer: {
    marginBottom: '3em'
  },
  addClassButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
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

const AddClassModal = ({ open, handleClickOpen, addClass }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [classCredentials, setClassCredentials] = useState({
    courseCode: '',
    courseName: '',
    units: ''
  });

  const { courseCode, courseName, units } = classCredentials;

  const handleSubmit = e => {
    e.preventDefault();
    handleClickOpen(false);
    addClass(courseCode, { courseCode, courseName, units });
    setClassCredentials({ courseCode: '', courseName: '', units: '' });
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setClassCredentials({ ...classCredentials, [name]: value });
  };

  const modalContent = {
    title: 'Class Information',
    content: () => (
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          onChange={handleChange}
          name='courseCode'
          value={courseCode}
          autoFocus
          margin='dense'
          label='Course Code'
          type='text'
          fullWidth
        />
        <TextField
          className={classes.textField}
          onChange={handleChange}
          name='courseName'
          value={courseName}
          margin='dense'
          label='Course Name'
          type='text'
          fullWidth
        />
        <TextField
          className={classes.textField}
          onChange={handleChange}
          name='units'
          value={units}
          margin='dense'
          label='Units'
          type='text'
          fullWidth
        />
        <Grid
          container
          justify='space-between'
          style={{ width: matchesXS ? '100%' : '36%', marginTop: '1.2em' }}
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
              type='submit'
              variant='outlined'
              className={classes.greenButton}
              color='primary'
            >
              Add Class
            </Button>
          </Grid>
        </Grid>
      </form>
    ),
    actions: () => <></>
  };

  return (
    <Modal {...modalContent} open={open} handleClickOpen={handleClickOpen} />
  );
};

export default AddClassModal;
