import React from 'react';
import { createStyles, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const footerStyles = theme =>
  createStyles({
    buttonContainer: {
      // textAlign: 'center'
    },
    input: {
      display: 'none'
    },
    title: {
      marginTop: '30px',
      textAlign: 'center'
    }
  });

function Footer({ classes }) {
  return (
    <>
      <Grid className={classes.buttonContainer} item xs={12}>
        <Typography variant="title" gutterBottom>
          There are many more scenarios that can be acheived using the Market
          Protocols subgraph such as:
          <ul>
            <li>Subscribing to Token Minted and Token Redeemed events.</li>
            <li>
              Querying the settlement price of contract and determine how much
              you gain or loss from redeeming position tokens
            </li>
            <li>
              Because position tokens are ERC20 tokens and are currently trading
              using the 0x Protocol, you can combine this subgraph with the{' '}
              <a href="https://github.com/0xproject/0x-subgraph">
                Zerox Event Subgraph
              </a>{' '}
              to keep track of Position Token trades.
            </li>
            <li>And many more...</li>
          </ul>
        </Typography>
        <Typography variant="subtitle1">
          <p>
            This website is a demo that walks you through the benefits of using
            Market Protocol's subgraph deployed at{' '}
            <a href="https://thegraph.com/explorer/subgraph/perfectmak/marketprotocol-kovan">
              https://thegraph.com/explorer/subgraph/perfectmak/marketprotocol-kovan
            </a>
            .
          </p>
          For information on Market Protocol visit{' '}
          <a href="https://marketprotocol.io">https://marketprotocol.io</a> or
          interact with the dApp at{' '}
          <a href="https://mpexchange.io">https://mpexchange.io</a>.
        </Typography>
      </Grid>
    </>
  );
}

export default withStyles(footerStyles)(Footer);
