import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';

import Signin from '../components/auth/Signin';
import Signup from '../components/auth/Signup';

const Auth = () => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      style={{ width: matchesSM ? '85%' : '60%' }}
      direction={matchesSM ? 'column' : 'row'}
      justify={matchesSM ? undefined : 'space-between'}
    >
      <Grid
        item
        style={{
          width: matchesSM ? '100%' : '45%',
          marginBottom: matchesSM ? '5em' : 0
        }}
      >
        <Signin />
      </Grid>
      <Grid item style={{ width: matchesSM ? '100%' : '45%' }}>
        <Signup />
      </Grid>
    </Grid>
  );
};

export default Auth;
