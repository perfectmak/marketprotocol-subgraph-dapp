import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  createStyles,
  withStyles
} from '@material-ui/core';
import { ApolloConsumer } from 'react-apollo';
import * as moment from 'moment';

import { AllMarketContractsQuery } from '../../queries';
import RunScenario from '../RunScenario';
import { DisplayData } from '../DisplayData';

const gravatarStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 300
    },
    image: {
      height: 150
    },
    displayName: {
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    id: {
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    owner: {
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  });

const MarketContract = ({
  classes,
  id,
  name,
  priceCap,
  priceFloor,
  isSettled,
  settlementPrice,
  expirationTimestamp,
  settlementTimestamp,
  oracleUrl
}) => {
  const expirationTimestampInt = parseInt(expirationTimestamp, 10);
  const isExpired = moment().unix() > expirationTimestampInt;
  return (
    <Grid item>
      <Card>
        <CardActionArea className={classes.actionArea}>
          <CardContent>
            <Typography
              variant="h6"
              component="h3"
              className={classes.displayName}
            >
              {name || '—'}
            </Typography>
            <Typography color="textSecondary">Address</Typography>
            <Typography component="p" className={classes.id}>
              {id}
            </Typography>
            <Typography color="textSecondary">Price Data</Typography>
            <Typography component="p" className={classes.owner}>
              Price Cap: {priceCap}
              <br />
              Price Floor: {priceFloor}
              <br />
            </Typography>
            <Typography color="textSecondary">Settlement Status</Typography>
            <Typography component="p" className={classes.owner}>
              {isSettled ? <>Settled</> : <>Not Settled</>}
              <br />
              {isSettled && (
                <>
                  Settlement Price: ${settlementPrice}
                  <br />
                </>
              )}
              Expires on{' '}
              {moment.unix(parseInt(expirationTimestamp, 10)).format()}{' '}
              {isExpired && <>(EXPIRED)</>}
            </Typography>
            <Typography color="textSecondary">Oracle Information</Typography>
            <Typography component="p" className={classes.owner}>
              URL:{' '}
              <a href={oracleUrl} target="_blank" rel="noopener noreferrer">
                {oracleUrl}
              </a>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export const StyledMarketContract = withStyles(gravatarStyles)(MarketContract);

const gravatarsStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2
    }
  });

/**
 * This section section scenario
 *
 */
const SecondSection = ({ classes }) => {
  const [marketContracts, setMarketContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ApolloConsumer>
      {client => (
        <Grid container direction="column" spacing={16}>
          <Grid item>
            <Typography variant="title" className={classes.title}>
              Scenario 1: Fetching a list of all Market Contracts deployed.
              <RunScenario
                onClick={() => {
                  setMarketContracts([]);
                  setLoading(true);
                  setError(null);
                  client
                    .query({
                      query: AllMarketContractsQuery
                    })
                    .then(({ data }) => {
                      setMarketContracts(data.marketContracts);
                    })
                    .catch(err => {
                      setError(err.message);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
              />
            </Typography>
          </Grid>
          <Grid item>
            <DisplayData loading={loading} error={error}>
              {marketContracts.map(gravatar => (
                <StyledMarketContract key={gravatar.id} {...gravatar} />
              ))}
            </DisplayData>
          </Grid>
        </Grid>
      )}
    </ApolloConsumer>
  );
};

export default withStyles(gravatarsStyles)(SecondSection);
