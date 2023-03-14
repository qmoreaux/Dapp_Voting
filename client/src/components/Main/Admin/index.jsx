import { useState, useEffect } from 'react';

import { Stack, Card, CardContent, Grid, Typography } from '@mui/material';

import Owner from './Owner';
import useEvents from '../../../hooks/useEvents';
import useAlert from '../../../contexts/AlertContext/useAlert';

export default function Admin({ contract, accounts, web3, owner, status }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
            {owner ? (
              <Owner
                handleWorkflow={handleWorkflow}
                error={error}
                address={address}
                setError={setError}
                setAddress={setAddress}
                addVoter={addVoter}
                status={status}
                events={events}
                loading={loading}
                disabled={disabled}
              />
            ) : (
              <Typography>Don't have access</Typography>
            )}
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
