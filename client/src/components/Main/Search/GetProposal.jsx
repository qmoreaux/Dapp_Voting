import { useState } from 'react';

import { Stack, Button, TextField, Typography } from '@mui/material';

import useAlert from '../../../contexts/AlertContext/useAlert';

import useEvents from '../../../hooks/useEvents';

export default function GetProposal({ contract, accounts }) {
  const [proposalID, setProposalID] = useState('');
  const [proposal, setProposal] = useState('');

  const events = useEvents('ProposalRegistered');

  const { addAlert } = useAlert();

  const handleInputChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setProposalID(e.target.value);
    }
  };

  const isValidProposalId = () => {
    return events.find((event) => {
      if (event.returnValues.proposalId === proposalID) {
        return true;
      }
      return false;
    });
  };

  async function getProposal() {
    try {
      const _proposal = await contract.methods.getOneProposal(proposalID).call({ from: accounts[0] });
      setProposal({ ..._proposal, proposalID: proposalID });
    } catch (error) {
      console.error(error);
      addAlert({ message: error.message, severity: 'error' });
    }
  }

  const clearProposal = () => {
    setProposal('');
    setProposalID('');
  };

  return (
    <Stack className="stack-search">
      <Typography>Get Proposal</Typography>
      <div>
        <TextField size="small" label="Proposal ID" value={proposalID} onChange={handleInputChange} />
        <Button variant="contained" onClick={getProposal} disabled={!isValidProposalId()}>
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
        <Stack className="response-container">
          <Typography className="label">Proposal ID</Typography>
          <Typography className="value"> {proposal.proposalID}</Typography>
          <Typography className="label">Description</Typography>
          <Typography className="value">{proposal.description}</Typography>
          <Typography className="label">Vote count</Typography>
          <Typography className="value">{proposal.voteCount}</Typography>
        </Stack>
      ) : (
        ''
      )}
    </Stack>
  );
}
