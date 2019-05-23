import React from 'react';
import { Grid, Button } from '@material-ui/core';

export function Section({
  children,
  secondary,
  nextText,
  onNextClicked,
  showNext = true
}) {
  let className = '';
  if (secondary) {
    className += 'section-secondary';
  }
  const nextButtonText = nextText || 'Proceed to next scenario';
  return (
    <Grid container className={`section ${className}`}>
      {children}
      <Grid className={`align-center`} item xs={12}>
        {showNext && (
          <Button
            style={{ marginTop: '20px' }}
            variant="contained"
            color="primary"
            onClick={onNextClicked}
          >
            {nextButtonText}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
