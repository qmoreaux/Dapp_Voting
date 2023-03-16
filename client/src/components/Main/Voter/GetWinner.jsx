import { useState } from 'react';

import { Grid, Button, Typography } from '@mui/material';
import useApp from '../../../contexts/AppContext/useApp';
import { actions } from '../../../contexts/AppContext/state';

export default function SubmitProposal({ contract, accounts }) {
  const [proposalId, setProposalId] = useState(0);
  const [proposal, setProposal] = useState('');

  const { dispatch } = useApp();

  async function getWinner() {
    try {
      const _proposalId = await contract.methods.winningProposalID().call({ from: accounts[0] });
      const _proposal = await contract.methods.getOneProposal(_proposalId).call({ from: accounts[0] });
      setProposalId(_proposalId);
      setProposal(_proposal);
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.setAlerts,
        data: {
          message: error.message,
          severity: 'error'
        }
      });
    }
  }

  return (
    <Grid container>
      <Grid item>
        <Button variant="contained" onClick={getWinner}>
          Get Winner
        </Button>
        {proposalId && proposal ? (
          <Typography className="winning-proposal">
            Winning Proposal ID : <b>{proposalId}</b>
            <br />
            Winning Proposal Description : <b>{proposal.description}</b>
          </Typography>
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  );
}
