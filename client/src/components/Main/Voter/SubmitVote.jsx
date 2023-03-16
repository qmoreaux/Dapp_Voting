import { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useApp from '../../../contexts/AppContext/useApp';
import { actions } from '../../../contexts/AppContext/state';

export default function SubmitVote({ contract, accounts }) {
  const [vote, setVote] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const {
    state: {
      events: { proposalEvents }
    },
    dispatch
  } = useApp();

  const handleChange = (event) => {
    setVote(event.target.value);
  };

  async function submitVote() {
    setLoading(true);
    try {
      await contract.methods.setVote(vote).call({ from: accounts[0] });
      await contract.methods.setVote(vote).send({ from: accounts[0] });
      dispatch({
        type: actions.setAlerts,
        data: {
          message: `Vote submited for proposal : ${vote}`,
          severity: 'success'
        }
      });
      setVote('');
      setHasVoted(true);
    } catch (error) {
      dispatch({
        type: actions.setAlerts,
        data: {
          message: error.message,
          severity: 'error'
        }
      });
    }
    setLoading(false);
  }

  async function checkHasVoted() {
    const voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
    setHasVoted(voter.hasVoted);
  }

  useEffect(() => {
    if (contract && accounts) {
      checkHasVoted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, accounts]);

  return (
    <Grid container>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="vote-select-label">Vote</InputLabel>
          <Select labelId="vote-select-label" value={vote} label="Vote" onChange={handleChange}>
            {proposalEvents.map((event) => (
              <MenuItem key={event.returnValues.proposalId} value={event.returnValues.proposalId}>
                {event.returnValues.proposalId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoadingButton loading={loading} variant="contained" onClick={submitVote} disabled={hasVoted || !vote}>
          {hasVoted ? 'You have already voted' : 'Vote'}
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
