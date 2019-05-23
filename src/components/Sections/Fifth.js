import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  createStyles,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { ApolloConsumer } from 'react-apollo';
import * as moment from 'moment';

import { AllMarketContractsWithPositionTokensExpiringWithinQuery } from '../../queries';
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

export const PositionTokenData = positionToken => (
  <>
    Address: {positionToken.id}
    <br />
    Name: {positionToken.name}
    <br />
    Symbol: {positionToken.symbol}
    <br />
    Decimals: {positionToken.decimals}
    <br />
    Market Side: {positionToken.marketSide}
    <br />
  </>
);

const MarketContract = ({
  classes,
  id,
  name,
  shortPositionToken,
  longPositionToken,
  expirationTimestamp
}) => {
  const expirationTimestampInt = parseInt(expirationTimestamp, 10);
  const isExpired = moment().unix() > expirationTimestampInt;
  return (
    <Grid item>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography
              variant="h6"
              component="h3"
              className={classes.displayName}
            >
              {name || '—'}
            </Typography>
            <Typography component="p" className={classes.id}>
              Expires on{' '}
              {moment.unix(parseInt(expirationTimestamp, 10)).format()}{' '}
              {isExpired && <>(EXPIRED)</>}
            </Typography>
            <Typography variant="h6" component="h4" color="textSecondary">
              Long Position Token
            </Typography>
            <Typography component="p" className={classes.id}>
              {PositionTokenData(longPositionToken)}
            </Typography>
            <Typography variant="h6" component="h4" color="textSecondary">
              Short PositionToken
            </Typography>
            <Typography component="p" className={classes.owner}>
              {PositionTokenData(shortPositionToken)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const StyledMarketContract = withStyles(gravatarStyles)(MarketContract);

const gravatarsStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 250
    }
  });

// returns an array of gt and lt based on period and current timestamp
const range = period => {
  const now = moment();
  switch (period) {
    case 'week':
      return [now.unix(), now.add(1, 'week').unix()];
    case 'month':
      return [now.unix(), now.add(1, 'month').unix()];
    case 'year':
      return [now.unix(), now.add(1, 'year').unix()];
    case 'past-month':
      return [now.subtract(1, 'month').unix(), now.unix()];
    case 'past-year':
      return [now.subtract(1, 'year').unix(), now.unix()];
    default:
      return [now.unix(), now.unix()];
  }
};

/**
 * This section section scenario
 *
 */
const ThirdSection = ({ classes }) => {
  const [marketContracts, setMarketContracts] = useState([]);
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ApolloConsumer>
      {client => (
        <Grid container direction="column" spacing={16}>
          <Grid item>
            <Typography variant="title" className={classes.title}>
              Scenario 5: You can use the subgraph to query contracts (and in
              effect position tokens) that would be expiring during a period.
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="period">Expiration Period</InputLabel>
                <Select
                  value={period}
                  onChange={ev => {
                    setPeriod(ev.target.value);
                  }}
                  inputProps={{
                    name: 'period',
                    id: 'period'
                  }}
                >
                  <MenuItem value="week">
                    <em>One Week</em>
                  </MenuItem>
                  <MenuItem value="month">One Month</MenuItem>
                  <MenuItem value="year">One Year</MenuItem>
                  <MenuItem value="past-month">Past Month</MenuItem>
                  <MenuItem value="past-year">Past Year</MenuItem>
                </Select>
              </FormControl>
              <RunScenario
                onClick={() => {
                  setMarketContracts([]);
                  setLoading(true);
                  setError(null);
                  const variables = range(period);
                  client
                    .query({
                      query: AllMarketContractsWithPositionTokensExpiringWithinQuery,
                      variables: {
                        gt: variables[0],
                        lt: variables[1]
                      }
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
            <div style={{ marginBottom: '15px' }}>
              <em>
                NOTE: A contract being expired is different from a contract
                being settled. You can checkout{' '}
                <a
                  href="https://marketprotocol.io"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Market Protocol's
                </a>{' '}
                whitepaper to better understand this.
              </em>
            </div>
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

export default withStyles(gravatarsStyles)(ThirdSection);
