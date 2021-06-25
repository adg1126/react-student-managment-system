import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <Grid
        container
        style={{ width: '100vw', height: '90vh' }}
        justify='center'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h1'>ERROR</Typography>
        </Grid>
      </Grid>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
