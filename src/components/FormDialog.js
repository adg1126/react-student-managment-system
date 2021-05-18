import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%',
    height: '100vh',
    margin: '1em'
  },
  headerContainer: {
    marginBottom: '3em'
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

const FormDialog = ({ open, handleClickOpen }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={() => handleClickOpen(false)}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Class Information</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.textField}
          autoFocus
          margin='dense'
          id='couseCode'
          label='Course Code'
          type='text'
          fullWidth
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin='dense'
          id='couseName'
          label='Course Name'
          type='text'
          fullWidth
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin='dense'
          id='units'
          label='Units'
          type='text'
          fullWidth
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin='dense'
          id='students'
          label='Students'
          type='text'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          className={classes.redButton}
          onClick={() => handleClickOpen(false)}
          color='primary'
        >
          Cancel
        </Button>
        <Button
          variant='outlined'
          className={classes.greenButton}
          onClick={() => handleClickOpen(false)}
          color='primary'
        >
          Add Class
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
