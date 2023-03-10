import useEth from '../../../contexts/EthContext/useEth';

import { useState } from 'react';

import { Button, TextField } from '@mui/material';

export default function GetProposal() {
  const [proposalID, setProposalID] = useState('');
  const [proposal, setProposal] = useState();
  const {
    state: { contract, accounts }
  } = useEth();

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
    }
  }

  return (
    <>
      <div className="with-border">
        <label>Get Proposal</label>
        <div>
          <TextField size="small" label="Proposal ID" value={proposalID} onChange={handleInputChange} />
          <Button variant="contained" onClick={getProposal}>
            Get
          </Button>
        </div>
        <div>{proposal}</div>
      </div>
    </>
  );
}
