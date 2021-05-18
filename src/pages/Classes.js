import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';

import ClassListTable from '../components/table/ClassListTable';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%',
    height: '100vh',
    margin: '1em'
  },
  headerContainer: {
    marginBottom: '3em'
  },
  addClassButton: {
    ...theme.button,
    ...theme.buttonFillIndigoAnimation,
    fontSize: '1em'
  }
}));

const Classes = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainContainer} direction='column'>
      <Grid item container className={classes.headerContainer}>
        <Grid item>
          <Typography variant='h3'>Classes List</Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <Button
            variant='outlined'
            className={classes.addClassButton}
            startIcon={<PostAddIcon />}
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
