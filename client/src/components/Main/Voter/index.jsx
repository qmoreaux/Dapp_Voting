
import useStatus from '../../../hooks/useStatus';

import NotWhitelisted from '../NotWhitelisted';
import SubmitProposal from './SubmitProposal';
import SubmitVote from './SubmitVote';

import { Card, CardContent} from '@mui/material';


export default function Voter({ whitelist, contract, accounts }) {

  const status = useStatus();

  return (
    <>
      <Card sx={{ height: 300, backgroundColor: '#e7ebf0' }}>
        <CardContent>
          {whitelist ? (
            <div>
              You are whitelisted. Congrats !
              {status === 1 ? (
                <SubmitProposal contract={contract} accounts={accounts}/>
              ) : status === 3 ? (
                <SubmitVote />
              ) : (
                'Nothing to do for now'
              )}
            </div>
          ) : (
            <NotWhitelisted />
          )}
        </CardContent>
      </Card>
    </>
  );
}
