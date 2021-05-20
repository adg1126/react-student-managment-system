import React from 'react';
import Spinner from '../components/Spinner';

const WithSpinner =
  WrappedComponent =>
  ({ isFetching, ...otherProps }) =>
    isFetching ? <Spinner /> : <WrappedComponent {...otherProps} />;

export default WithSpinner;
