import { useState } from 'react';

import { Button, Card, CardContent, Grid, TextField } from '@mui/material';

import WorkflowButton from './WorkFlowButton';
import useEth from '../../../contexts/EthContext/useEth';
import useEvents from '../../../hooks/UseEvents';
import useStatus from '../../../hooks/useStatus';

export default function Admin() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = useStatus();
  const events = useEvents('VoterRegistered');

  const {
    state: { contract, accounts, web3 }
  } = useEth();

  async function addVoter() {
    if (web3.utils.isAddress(address)) {
      try {
        await contract.methods.addVoter(address).send({ from: accounts[0] });
        setAddress('');
        console.log('success');
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  }

  async function handleWorkflow() {
    setLoading(true);
    try {
      await contract.methods
        .startProposalsRegistering()
        .send({ from: accounts[0] });
      console.log('success');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <Card sx={{ height: 300, backgroundColor: '#e7ebf0' }}>
      <CardContent>
        <Grid
          height="100%"
          display={'flex'}
          flexDirection="column"
          justifyContent={'center'}
          container
          spacing={2}
        >
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
              <WorkflowButton
                loading={loading}
                status={status}
                handleWorkflow={handleWorkflow}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
