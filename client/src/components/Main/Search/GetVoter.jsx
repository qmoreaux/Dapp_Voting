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
        console.log(_voter);
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
      <div className="with-border">
        <label>Get Voter</label>
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
          <Button variant="contained" onClick={getVoter}>
            Get
          </Button>
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
