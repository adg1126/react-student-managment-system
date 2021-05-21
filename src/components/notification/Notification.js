import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const Notification = ({
  status,
  notificationOpen,
  handleNotificationClose
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={status.success ? 'success' : 'error'}
        >
          {status.success || status.err}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notification;
