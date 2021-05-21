import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';

import ClassListContainer from '../containers/ClassListContainer';
import AddClassModalContainer from '../containers/AddClassModalContainer';
import Notification from '../components/notification/Notification';
import NotificationContainer from '../containers/NotificationContainer';

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
  }
}));

const Classes = () => {
  const classes = useStyles();

  const [open, setModalOpen] = useState(false);

  const handleClickOpen = state => {
    setModalOpen(state);
  };

  return (
    <Grid container className={classes.mainContainer} direction='column'>
      <Grid item container className={classes.headerContainer}>
        <Grid item>
          <Typography variant='h3'>Classes List</Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <AddClassModalContainer
            open={open}
            handleClickOpen={handleClickOpen}
          />
          <Button
            variant='outlined'
            className={classes.addClassButton}
            startIcon={<PostAddIcon />}
            onClick={() => handleClickOpen(true)}
          >
            Add Class
          </Button>
        </Grid>
        <Grid item>
          <ClassListContainer />
        </Grid>
      </Grid>
      <NotificationContainer />
    </Grid>
  );
};

export default Classes;
