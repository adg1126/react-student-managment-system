import React, { useEffect } from 'react';

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

const Notification = ({ status, notificationOpen, setNotificationOpen }) => {
  const classes = useStyles();

  console.log(status);
  useEffect(() => {
    if (status.success.length || status.err.length) {
      setNotificationOpen(true);
      setTimeout(() => {
        setNotificationOpen(false);
      }, 3000);
    }
  }, [status, setNotificationOpen]);

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

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
