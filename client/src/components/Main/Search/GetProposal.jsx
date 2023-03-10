import { useState } from 'react';

import { Button, TextField } from '@mui/material';

import useAlert from '../../../contexts/AlertContext/useAlert';

export default function GetProposal({ contract, accounts }) {
  const [proposalID, setProposalID] = useState('');
  const [proposal, setProposal] = useState('');

  const { addAlert } = useAlert();

  const handleInputChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setProposalID(e.target.value);
    }
  };

  async function getProposal() {
    try {
      const _proposal = await contract.methods.getOneProposal(proposalID).call({ from: accounts[0] });
      setProposal(_proposal);
    } catch (error) {
      console.log(error);
      addAlert({ message: error.message, severity: 'error' });
    }
  }

  function clearProposal() {
    setProposal('');
    setProposalID('');
  }

  return (
    <>
      <div className="with-border">
        <label>Get Proposal</label>
        <div>
          <TextField sx={{ mr: 2 }} size="small" label="Proposal ID" value={proposalID} onChange={handleInputChange} />
          <Button sx={{ mr: 2 }} variant="contained" onClick={getProposal}>
            Get
          </Button>
          {proposal ? (
            <Button variant="contained" onClick={clearProposal}>
              Clear
            </Button>
          ) : (
            ''
          )}
        </div>
        {proposal ? (
          <>
            <div className="element-container">
              <div className="element">
                <div className="element-label">Proposal ID</div>
                <div className="element-value"> {proposalID}</div>
              </div>
              <div className="element">
                <div className="element-label">Description</div>
                <div className="element-value"> {proposal.description}</div>
              </div>
              <div className="element">
                <div className="element-label">Vote count</div>
                <div className="element-value"> {proposal.voteCount}</div>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
