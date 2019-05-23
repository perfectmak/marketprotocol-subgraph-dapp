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

import {
  AllMarketContractsWithPositionTokensQuery
} from '../../queries';
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


export const PositionTokenData = (positionToken) => (<>
Address: {positionToken.id}<br/>
Name: {positionToken.name}<br/>
Symbol: {positionToken.symbol}<br/>
Decimals: {positionToken.decimals}<br/>
Market Side: {positionToken.marketSide}<br/>
</>);

const MarketContract = ({
  classes,
  id,
  name,
  shortPositionToken,
  longPositionToken
}) => (
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
          <Typography variant="h6" component="h4" color="textSecondary">Long Position Token</Typography>
          <Typography component="p" className={classes.id}>
            {PositionTokenData(longPositionToken)}
          </Typography>
          <Typography variant="h6" component="h4" color="textSecondary">Short PositionToken</Typography>
          <Typography component="p" className={classes.owner}>
          {PositionTokenData(shortPositionToken)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

const StyledMarketContract = withStyles(gravatarStyles)(MarketContract);

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
const ThirdSection = ({ classes }) => {
  const [marketContracts, setMarketContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ApolloConsumer>
      {client => (
        <Grid container direction="column" spacing={16}>
          <Grid item>
            <Typography variant="title" className={classes.title}>
              Scenario 2: Now let us fetch Market Contracts with their Position
              Token Information.
              <RunScenario
                onClick={() => {
                  setMarketContracts([]);
                  setLoading(true);
                  setError(null);
                  client
                    .query({
                      query: AllMarketContractsWithPositionTokensQuery
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

export default withStyles(gravatarsStyles)(ThirdSection);
