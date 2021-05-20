import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Typography } from '@material-ui/core';

const Spinner = () => (
  <Grid container justify='center' alignContent='center' direction='column'>
    <Grid item>
      <CircularProgress size={60} color='secondary' />
    </Grid>
    <Grid item>
      <Typography variant='h6'>Loading...</Typography>
    </Grid>
  </Grid>
);

export default Spinner;
