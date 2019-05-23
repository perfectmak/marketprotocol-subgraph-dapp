import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  TextField,
  Typography,
  createStyles,
  withStyles
} from '@material-ui/core';
import { ApolloConsumer } from 'react-apollo';

import { PositionTokenOwnerWithAddress } from '../../queries';
import RunScenario from '../RunScenario';
import { DisplayData } from '../DisplayData';
import { PositionTokenData } from './Third';

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

const PositionTokenOwner = ({ classes, id, owner, token, balance }) => (
  <Grid item>
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography
            variant="h6"
            component="h3"
            className={classes.displayName}
          >
            Balance: {balance}
          </Typography>
          <Typography variant="h6" component="h4" color="textSecondary">
            Position Token
          </Typography>
          <Typography component="p" className={classes.id}>
            {PositionTokenData(token)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

const StyledPositionTokenOwner = withStyles(gravatarStyles)(PositionTokenOwner);

const gravatarsStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 600,
    }
  });

/**
 * This section section scenario
 *
 */
const ThirdSection = ({ classes }) => {
  const [positionTokenOwners, setPositonTokenOwners] = useState([]);
  const [ownerAddress, setOwnerAddress] = useState(
    '0xeb658022c522770e716e515a0c40643302c130c2'
  );
  const [showNoTokens, setShowNoTokens] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ApolloConsumer>
      {client => (
        <Grid container direction="column" spacing={16}>
          <Grid item>
            <Typography variant="title" className={classes.title}>
              Scenario 3: Now for something more interesting, the subgraph makes
              it easy to check all position tokens a user has ever held. Try it
              now.
              <TextField
                id="standard-name"
                label="Enter address to lookup (or run with default value)"
                className={classes.textField}
                value={ownerAddress}
                onChange={ev => {
                  setOwnerAddress(ev.target.value);
                }}
                margin="normal"
              />
              <RunScenario
                onClick={() => {
                  setPositonTokenOwners([]);
                  setLoading(true);
                  setError(null);
                  client
                    .query({
                      query: PositionTokenOwnerWithAddress,
                      variables: {
                        ownerAddress: ownerAddress.toLowerCase()
                      }
                    })
                    .then(({ data }) => {
                      setPositonTokenOwners(data.positionTokenOwners);
                      if (data.positionTokenOwners.length === 0) {
                        setShowNoTokens(true);
                      } else {
                        setShowNoTokens(false);
                      }
                    })
                    .catch(err => {
                      setError(err.message);
                      setShowNoTokens(false);
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
              {positionTokenOwners.map(gravatar => (
                <StyledPositionTokenOwner key={gravatar.id} {...gravatar} />
              ))}
              {showNoTokens && (
                <>
                  The user with address has never held a Market Protocol
                  Position Token
                </>
              )}
            </DisplayData>
          </Grid>
        </Grid>
      )}
    </ApolloConsumer>
  );
};

export default withStyles(gravatarsStyles)(ThirdSection);
