import GetProposal from './GetProposal';
import GetVoter from './GetVoter';
import NotWhitelisted from '../NotWhitelisted';

import { Card, CardContent, Stack} from '@mui/material';

import './Search.css';

export default function Search({ whitelist, contract, accounts, web3 }) {
  return (
    <>
    <Card className="search" sx={{ height: '100%', backgroundColor: '#e7ebf0' }}>
      <CardContent>
        {whitelist ? (
          <Stack
          justifyContent="space-evenly"
          alignItems="center"
        >
            <h3>Search</h3>
            <GetProposal contract={contract} accounts={accounts}/>
            <GetVoter contract={contract} accounts={accounts} web3={web3}/>
          </Stack>
        ) : (
          <NotWhitelisted />
        )}
      </CardContent>
    </Card>
    </>
  );
}
