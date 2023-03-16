import { useState } from 'react';

import { Stack, Button, TextField, Typography } from '@mui/material';

import { actions } from '../../../contexts/AppContext/state';
import useApp from '../../../contexts/AppContext/useApp';

export default function GetVoter({ contract, accounts, web3 }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [voter, setVoter] = useState('');

  const { dispatch } = useApp();

  async function getVoter() {
    if (isAddressValid()) {
      try {
        const _voter = await contract.methods
          .getVoter(address)
          .call({ from: accounts[0] });
        setVoter({ ..._voter, address: address });
      } catch (error) {
        dispatch({
          type: actions.setAlerts,
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

  function isAddressValid() {
    return web3.utils.isAddress(address);
  }

  function clearVoter() {
    setAddress('');
    setVoter('');
  }

  return (
    <Stack className="stack-search">
      <Typography>Get Voter</Typography>
      <div>
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
        <Button
          variant="contained"
          onClick={getVoter}
          disabled={!isAddressValid()}
        >
          Get
        </Button>
        {voter && (
          <Button variant="contained" onClick={clearVoter}>
            Clear
          </Button>
        )}
      </div>
      {voter && (
        <Stack className="response-container">
          <Typography className="label">Address</Typography>
          <Typography className="value"> {voter.address}</Typography>
          <Typography className="label">Registered</Typography>
          <Typography className="value">
            {voter.isRegistered ? 'Yes' : 'No'}
          </Typography>
          {voter.isRegistered && (
            <>
              <Typography className="label">Has voted</Typography>
              <Typography className="value">
                {voter.hasVoted ? 'Yes' : 'No'}
              </Typography>
              {voter.hasVoted && (
                <>
                  <Typography className="label">Voted proposal</Typography>
                  <Typography className="value">
                    {voter.votedProposalId}
                  </Typography>
                </>
              )}
            </>
          )}
        </Stack>
      )}
    </Stack>
  );
}
