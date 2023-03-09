import GetProposal from './GetProposal';
import GetVoter from './GetVoter';

export default function Voter({ whitelist }) {
  return (
    <>
      <div className="card">
        {whitelist ? (
          <>
            <div>
              <GetProposal />
            </div>
            <div>
              <GetVoter />
            </div>
          </>
        ) : (
          'You are not whitelisted'
        )}
      </div>
    </>
  );
}
