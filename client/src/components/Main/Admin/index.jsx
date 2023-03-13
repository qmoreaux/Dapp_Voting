import { useState } from 'react';

import {
  Stack,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import WorkflowButton from './WorkflowButton';

import useEvents from '../../../hooks/useEvents';
import useStatus from '../../../hooks/useStatus';
import useAlert from '../../../contexts/AlertContext/useAlert';
import { useEffect } from 'react';

export default function Admin({ contract, accounts, web3 }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const status = useStatus();
  const events = useEvents('VoterRegistered');
  const proposalEvents = useEvents('ProposalRegistered');
  const votedEvents = useEvents('Voted');
  const { addAlert } = useAlert();

  async function addVoter() {
    if (web3.utils.isAddress(address)) {
      try {
        await contract.methods.addVoter(address).call({ from: accounts[0] });
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

  useEffect(() => {
    if (
      (status === 1 && proposalEvents.length === 0) ||
      (status === 3 && votedEvents.length === 0) ||
      status === 5
    ) {
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
      addAlert({
        message: 'Status has been changed !',
        severity: 'success'
      });
    } catch (error) {
      addAlert({ message: error.message, severity: 'error' });
    }
    setLoading(false);
  }

  return (
    <Card className="admin">
      <CardContent>
        <Stack>
          <Typography variant="h6">Administration</Typography>
          <Grid container spacing={2}>
            {status === 0 && (
              <Grid item>
                <TextField
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
                <WorkflowButton
                  loading={loading}
                  status={status}
                  handleWorkflow={handleWorkflow}
                  disabled={disabled}
                />
              </Grid>
            )}
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
