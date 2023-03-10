import GetProposal from './GetProposal';
import GetVoter from './GetVoter';
import NotWhitelisted from '../NotWhitelisted';

import { Card, CardContent} from '@mui/material';

import './Search.css';

export default function Search({ whitelist }) {
  return (
    <>
    <Card  className="search" sx={{ height: 300, backgroundColor: '#e7ebf0' }}>
      <CardContent>
        {whitelist ? (
          <>
            <h3>Search</h3>
            <GetProposal />
            <GetVoter />
          </>
        ) : (
          <NotWhitelisted />
        )}
      </CardContent>
    </Card>
    </>
  );
}
