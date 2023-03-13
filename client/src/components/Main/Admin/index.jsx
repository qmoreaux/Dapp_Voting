import { useState } from 'react';

import { Button, Card, CardContent, Grid, TextField } from '@mui/material';

import WorkflowButton from './WorkflowButton';

import useEvents from '../../../hooks/useEvents';
import useStatus from '../../../hooks/useStatus';
import useAlert from '../../../contexts/AlertContext/useAlert';

export default function Admin({ contract, accounts, web3 }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = useStatus();
  const events = useEvents('VoterRegistered');
  const { addAlert } = useAlert();

  async function addVoter() {
    if (web3.utils.isAddress(address)) {
      try {
        await contract.methods.addVoter(address).send({ from: accounts[0] });
        setAddress('');
        addAlert({
          message: `Voter added : ${address}`,
          severity: 'success'
        });
      } catch (error) {
        console.error(error);
        addAlert({ message: error.message, severity: 'error' });
      }
    } else {
      setError(true);
    }
  }

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
      await contract.methods[method]().send({ from: accounts[0] });
      addAlert({
        message: 'Status has been changed !',
        severity: 'success'
      });
    } catch (error) {
      console.error(error);
      addAlert({ message: error.message, severity: 'error' });
    }
    setLoading(false);
  }

  return (
    <Card sx={{ height: '100%', minHeight: '300px', backgroundColor: '#e7ebf0' }}>
      <CardContent>
        <Grid height="100%" display={'flex'} flexDirection="column" justifyContent={'center'} container spacing={2}>
          {status === 0 && (
            <Grid item display={'flex'} justifyContent={'center'}>
              <TextField
                sx={{ mr: 1 }}
                size="small"
                error={error}
                id="outlined-error-helper-text"
                label="Voter Address"
                value={address}
                helperText={error && 'Invalid address'}
                onChange={(event) => {
                  setError(false);
                  setAddress(event.target.value);
                }}
              />

              <Button variant="contained" onClick={addVoter}>
                Add
              </Button>
            </Grid>
          )}
          {events.length > 0 && (
            <Grid item display={'flex'} justifyContent={'center'}>
              <WorkflowButton loading={loading} status={status} handleWorkflow={handleWorkflow} />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
