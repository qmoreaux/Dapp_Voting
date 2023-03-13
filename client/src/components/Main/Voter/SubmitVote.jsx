import { useState, useEffect } from 'react';

import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useAlert from '../../../contexts/AlertContext/useAlert';
import useEvents from '../../../hooks/useEvents';

export default function SubmitVote({ contract, accounts }) {
  const [vote, setVote] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const events = useEvents('ProposalRegistered');
  const { addAlert } = useAlert();

  const handleChange = (event) => {
    setVote(event.target.value);
  };

  async function submitVote() {
    setLoading(true);
    try {
      await contract.methods.setVote(vote).send({ from: accounts[0] });
      addAlert({ message: `Vote submited for proposal : ${vote}`, severity: 'success' });
      setVote('');
      setHasVoted(true);
    } catch (error) {
      console.log(error);
      addAlert({ message: error.message, severity: 'error' });
    }
    setLoading(false);
  }

  async function checkHasVoted() {
    const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
    console.log(voter);
    setHasVoted(voter.hasVoted);
  }

  useEffect(() => {
    if (contract && accounts) {
      checkHasVoted();
    }
  }, [contract, accounts]);

  return (
    <Grid width="calc(100% - 80px)" display={'flex'} flexDirection="column" justifyContent={'center'} container>
      <Grid item display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <FormControl fullWidth>
          <InputLabel id="vote-select-label">Vote</InputLabel>

          <Select labelId="vote-select-label" value={vote} label="Vote" onChange={handleChange}>
            {events.map((event) => (
              <MenuItem key={event.returnValues.proposalId} value={event.returnValues.proposalId}>
                {event.returnValues.proposalId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LoadingButton loading={loading} variant="contained" onClick={submitVote} disabled={hasVoted}>
          {hasVoted ? 'You have already voted' : 'Submit'}
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
