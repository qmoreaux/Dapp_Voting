import { useState, useEffect } from 'react';
import { Stack, Card, CardContent, Grid, Typography } from '@mui/material';

import Owner from './Owner';

import useApp from '../../../contexts/AppContext/useApp';
import { actions } from '../../../contexts/AppContext/state';

export default function Admin({ contract, accounts, web3 }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    state: {
      events: { proposalEvents, votedEvents },
      owner,
      status
    },
    dispatch
  } = useApp();

  function isOwner() {
    return owner === accounts[0];
  }

  async function addVoter() {
    if (web3.utils.isAddress(address)) {
      try {
        await contract.methods.addVoter(address).call({ from: accounts[0] });
        await contract.methods.addVoter(address).send({ from: accounts[0] });
        setAddress('');
        dispatch({
          type: actions.setAlert,
          data: {
            message: `Voter added : ${address}`,
            severity: 'success'
          }
        });
      } catch (error) {
        dispatch({
          type: actions.setAlert,
          data: {
            message: error.message,
            severity: 'error'
          }
        });
      }
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    if ((status === 1 && proposalEvents.length === 0) || (status === 3 && votedEvents.length === 0) || status === 5) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [status, proposalEvents, votedEvents]);

  async function handleWorkflow() {
    let method;
    if (status === 0) {
      method = 'startProposalsRegistering';
    } else if (status === 1) {
      method = 'endProposalsRegistering';
    } else if (status === 2) {
      method = 'startVotingSession';
    } else if (status === 3) {
      method = 'endVotingSession';
    } else if (status === 4) {
      method = 'tallyVotes';
    }
    setLoading(true);
    try {
      await contract.methods[method]().call({ from: accounts[0] });
      await contract.methods[method]().send({ from: accounts[0] });
      dispatch({
        type: actions.setAlert,
        data: {
          message: 'Status has been changed !',
          severity: 'success'
        }
      });
    } catch (error) {
      dispatch({
        type: actions.setAlert,
        data: {
          message: error.message,
          severity: 'error'
        }
      });
    }
    setLoading(false);
  }

  return (
    <Card className="admin">
      <CardContent>
        <Stack>
          {isOwner() ? (
            <>
              <Typography variant="h6">Administration</Typography>
              <Grid container spacing={2}>
                <Owner
                  handleWorkflow={handleWorkflow}
                  error={error}
                  address={address}
                  setError={setError}
                  setAddress={setAddress}
                  addVoter={addVoter}
                  status={status}
                  loading={loading}
                  disabled={disabled}
                />
              </Grid>
            </>
          ) : (
            <Grid>
              <Typography>These functionnalities are only available to the owner.</Typography>
            </Grid>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
