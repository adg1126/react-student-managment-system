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
      <DialogContent>{content()}</DialogContent>
      <DialogActions>{actions()}</DialogActions>
    </Dialog>
  );
};

export default Modal;
