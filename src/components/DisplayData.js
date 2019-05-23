import React from 'react';
import {
 Grid,
 LinearProgress
} from '@material-ui/core'
import Error from './Error';

export const DisplayData = ({ children, error, loading }) => {
  return (<Grid container direction="row" spacing={16}>
  {loading && (
    <LinearProgress variant="query" style={{ width: '100%' }} />
  )}
  {children}
  {error && <Error error={error} />}
</Grid>);
}