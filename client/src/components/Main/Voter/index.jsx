import useStatus from '../../../hooks/useStatus';

import NotWhitelisted from '../NotWhitelisted';
import SubmitProposal from './SubmitProposal';
import SubmitVote from './SubmitVote';

import { Card, CardContent, Stack } from '@mui/material';

import './Voter.css';

export default function Voter({ whitelist, contract, accounts }) {
  const status = useStatus();

  function getStatusTitle() {
    switch (status) {
      case 0:
      case 2:
      case 4:
        return 'Waiting';
      case 1:
        return 'Submit proposal';
      case 3:
        return 'Vote';
      case 5:
        return 'Get Winner';
      default:
    }
  }

  return (
    <>
      <Card className="voter" sx={{ height: '100%', backgroundColor: '#e7ebf0' }}>
        <CardContent>
          {whitelist ? (
            <Stack height="100%" justifyContent="space-evenly" alignItems="center">
              <h3>{getStatusTitle()}</h3>
              {status === 1 ? (
                <SubmitProposal contract={contract} accounts={accounts} />
              ) : status === 3 ? (
                <SubmitVote />
              ) : (
                'Nothing to do for now'
              )}
            </Stack>
          ) : (
            <NotWhitelisted />
          )}
        </CardContent>
      </Card>
    </>
  );
}
