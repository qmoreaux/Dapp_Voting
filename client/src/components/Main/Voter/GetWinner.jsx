import { useState } from 'react';

import { Grid, Button } from '@mui/material';

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
    <Grid width="calc(100% - 80px)" display={'flex'} flexDirection="column" justifyContent={'center'} container>
      <Grid item display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <Button variant="contained" onClick={getWinner}>
          GetWinner
        </Button>
        {proposalId && proposal ? (
          <div>
            Winning Proposal ID : {proposalId}
            <br></br>
            Winning Proposal Description : {proposal.description}
          </div>
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  );
}
