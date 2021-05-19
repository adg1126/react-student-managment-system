import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = ({ open, handleClickOpen, title, content, actions }) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClickOpen(false)}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        {content()}
        {/* <TextField
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
        /> */}
      </DialogContent>
      <DialogActions>
        {actions()}
        {/* <Button
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
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
