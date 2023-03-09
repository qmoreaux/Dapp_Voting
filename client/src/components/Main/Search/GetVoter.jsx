import useEth from '../../../contexts/EthContext/useEth';

import { useState } from 'react';

import { Button, TextField } from '@mui/material';

export default function GetVoter() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [voter, setVoter] = useState('');

  const {
    state: { contract, accounts, web3 }
  } = useEth();

  async function getVoter() {
    if (web3.utils.isAddress(address)) {
      try {
        const _voter = await contract.methods.getVoter(address).call({ from: accounts[0] });
        setVoter(_voter);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  }
  return (
    <>
      <div className="card">
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
        <Button variant="contained" onClick={getVoter}>
          Get Voter
        </Button>
        {voter}
      </div>
    </>
  );
}
