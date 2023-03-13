import GetProposal from './GetProposal';
import GetVoter from './GetVoter';
import NotWhitelisted from '../NotWhitelisted';

import { Card, CardContent, Stack, Typography } from '@mui/material';

export default function Search({ whitelist, contract, accounts, web3 }) {
  return (
    <>
      <Card className="search">
        <CardContent>
          {whitelist ? (
            <Stack>
              <Typography variant="h6">Search</Typography>
              <GetProposal contract={contract} accounts={accounts} />
              <GetVoter contract={contract} accounts={accounts} web3={web3} />
            </Stack>
          ) : (
            <Stack>
              <NotWhitelisted />
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
}
