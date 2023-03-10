import GetProposal from './GetProposal';
import GetVoter from './GetVoter';
import NotWhitelisted from '../NotWhitelisted';

import './Search.css';

export default function Voter({ whitelist }) {
  return (
    <>
      <div className="card-item search">
        {whitelist ? (
          <>
            <h3>Search</h3>
            <GetProposal />
            <GetVoter />
          </>
        ) : (
          <NotWhitelisted />
        )}
      </div>
    </>
  );
}
