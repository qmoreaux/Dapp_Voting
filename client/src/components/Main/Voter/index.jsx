import NotWhitelisted from '../NotWhitelisted';
import SubmitProposal from './SubmitProposal';
import SubmitVote from './SubmitVote';
import GetWinner from './GetWinner';

import { Card, CardContent, Stack, Grid, Typography } from '@mui/material';

export default function Voter({ whitelist, contract, accounts, status }) {
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
    <Card className="voter">
      <CardContent>
        {whitelist ? (
          <Stack>
            <Typography variant="h6">{getStatusTitle()}</Typography>
            {status === 1 ? (
              <SubmitProposal contract={contract} accounts={accounts} />
            ) : status === 3 ? (
              <SubmitVote contract={contract} accounts={accounts} />
            ) : status === 5 ? (
              <GetWinner contract={contract} accounts={accounts} />
            ) : (
              <Grid>
                <Typography>
                  Nothing to do for now. <br />
                  Please wait for the admin to advance to the next step.
                </Typography>
              </Grid>
            )}
          </Stack>
        ) : (
          <Stack>
            <NotWhitelisted />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
