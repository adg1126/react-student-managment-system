import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';

import ClassListTable from '../components/table/ClassListTable';
import FormDialog from '../components/FormDialog';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    // width: '100%',
    // height: '100vh',
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

const Classes = ({ drawerOpen }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = state => {
    setOpen(state);
  };

  return (
    <Grid
      container
      className={classes.mainContainer}
      direction='column'
      // style={{ width: drawerOpen ? '83vw' : '92vw' }}
    >
      <Grid item container className={classes.headerContainer}>
        <Grid item>
          <Typography variant='h3'>Classes List</Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <FormDialog open={open} handleClickOpen={handleClickOpen} />
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
          <ClassListTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Classes;
