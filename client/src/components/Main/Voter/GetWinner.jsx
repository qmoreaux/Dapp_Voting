import { useState } from 'react';

import { Grid, Button, Typography } from '@mui/material';

import useAlert from '../../../contexts/AlertContext/useAlert';

export default function SubmitProposal({ contract, accounts }) {
  const [proposalId, setProposalId] = useState(0);
  const [proposal, setProposal] = useState('');

  const { addAlert } = useAlert();

  async function getWinner() {
    try {
      const _proposalId = await contract.methods.winningProposalID().call({ from: accounts[0] });
      const _proposal = await contract.methods.getOneProposal(_proposalId).call({ from: accounts[0] });
      setProposalId(_proposalId);
      setProposal(_proposal);
    } catch (error) {
      console.error(error);
      addAlert({ message: error.message, severity: 'error' });
    }
  }

  return (
    <Grid container>
      <Grid item>
        <Button variant="contained" onClick={getWinner}>
          Get Winner
        </Button>
        {proposalId && proposal ? (
          <Typography>
            Winning Proposal ID : {proposalId}
            <br />
            Winning Proposal Description : {proposal.description}
          </Typography>
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  );
}
