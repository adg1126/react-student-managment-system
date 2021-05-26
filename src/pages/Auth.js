import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';

import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100vw',
    minHeight: '90vh',
    backgroundColor: '#f5f8fb'
  },
  rowContainer: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '65%',
      margin: '4em'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: '1.5em'
    }
  },
  itemContainer: {
    background: 'white',
    border: `1px solid ${theme.palette.common.grey500}`,
    padding: '1em',
    width: '45%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

const Auth = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      justify='center'
      alignItems={matchesSM ? undefined : 'center'}
      className={classes.mainContainer}
    >
      <Grid
        item
        container
        justify={matchesSM ? 'center' : 'space-between'}
        className={classes.rowContainer}
      >
        <Grid
          item
          style={{
            marginBottom: matchesSM ? '5em' : 0
          }}
          className={classes.itemContainer}
        >
          <Signin />
        </Grid>
        <Grid item className={classes.itemContainer}>
          <Signup />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Auth;
