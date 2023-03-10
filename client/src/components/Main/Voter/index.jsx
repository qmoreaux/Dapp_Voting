import { useEffect, useState, useCallback } from 'react';
import NotWhitelisted from '../NotWhitelisted';
import SubmitProposal from './SubmitProposal';
import SubmitVote from './SubmitVote';

export default function Voter({ whitelist, contract }) {
  const [workflowStatus, setWorkflowStatus] = useState(0);

  const getCurrentWorkflowStatus = useCallback(async () => {
    const currentWorkflowStatus = await contract.methods.workflowStatus().call();
    setWorkflowStatus(currentWorkflowStatus);
  }, [contract]);

  useEffect(() => {
    if (contract) {
      getCurrentWorkflowStatus();
    }
  }, [contract, getCurrentWorkflowStatus]);

  return (
    <>
      <div className="card-item">
        {whitelist ? (
          <div>
            You are whitelisted. Congrats !
            {workflowStatus === 1 ? (
              <SubmitProposal />
            ) : workflowStatus === 3 ? (
              <SubmitVote />
            ) : (
              'Nothing to do for now'
            )}
          </div>
        ) : (
          <NotWhitelisted />
        )}
      </div>
    </>
  );
}
