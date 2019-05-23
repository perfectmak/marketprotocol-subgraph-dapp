import React from 'react';
import { createStyles, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Section } from './Section';

const introductionStyles = theme => createStyles({
  buttonContainer: {
    textAlign: 'center'
  },
  input: {
    display: 'none'
  },
  title: {
    marginTop: '30px',
    textAlign: 'center'
  }

});

function Introduction({ classes, startDemo }) {
  return (
    <Section onNextClicked={startDemo} nextText="Start Demo">
      <Grid className={classes.title} item xs={12}>
        <Typography component="h1" variant="h2">
          Market Protocol's Subgraph
        </Typography>
      </Grid>
      <Grid className={classes.buttonContainer} item xs={12}>
        <Typography component="h3" variant="h3" gutterBottom>
          Welcome.<br/>This website is a demo that walks you through the benefits of
          using Market Protocol's subgraph.
        </Typography>
        <Typography variant="subtitle1">
          NOTE: For a better experience, view this website on desktop. Also all scenarios would only fetch maximum of 10 results for brevity.
        </Typography>
      </Grid>
    </Section>
  );
}

export default withStyles(introductionStyles)(Introduction);
