import { useState } from 'react';

import { Button, TextField } from '@mui/material';

export default function GetVoter({ contract, accounts, web3 }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [voter, setVoter] = useState('');

  async function getVoter() {
    if (web3.utils.isAddress(address)) {
      try {
        const _voter = await contract.methods.getVoter(address).call({ from: accounts[0] });
        console.log(_voter);
        setVoter(_voter);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  }

  function clearVoter() {
    setAddress('');
    setVoter('');
  }

  return (
    <>
      <div className="with-border">
        <label>Get Voter</label>
        <div>
          <TextField
            sx={{ mr: 2 }}
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
          <Button sx={{ mr: 2 }} variant="contained" onClick={getVoter}>
            Get
          </Button>
          {voter ? (
            <Button variant="contained" onClick={clearVoter}>
              Clear
            </Button>
          ) : (
            ''
          )}
        </div>
        <div className="element-container">
          {voter ? (
            <>
              <div className="element">
                <div className="element-label">Address</div>
                <div className="element-value"> {address}</div>
              </div>
              <div className="element">
                <div className="element-label">Registered</div>
                <div className="element-value"> {voter.isRegistered ? 'Yes' : 'No'}</div>
              </div>
              <div className="element">
                <div className="element-label">Has voted</div>
                <div className="element-value"> {voter.hasVoted ? 'Yes' : 'No'}</div>
              </div>
              {voter.hasVoted ? (
                <div className="element">
                  <div className="element-label">Voted proposal</div>
                  <div className="element-value"> {voter.votedProposalId}</div>
                </div>
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
