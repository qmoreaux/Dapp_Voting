import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

import useEth from '../../contexts/EthContext/useEth';

export default function Admin() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);

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
  return (
    <>
      <div className="card">
        <TextField
          size="small"
          error={error}
          id="outlined-error-helper-text"
          label="Voter Address"
          defaultValue=""
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
      </div>
    </>
  );
}
