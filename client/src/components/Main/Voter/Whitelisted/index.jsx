import { useEffect, useState, useCallback } from 'react';

import SubmitProposal from './SubmitProposal';
import SubmitVote from './SubmitVote';

import useEth from '../../../../contexts/EthContext/useEth';

export default function Voter() {
  const {
    state: { contract }
  } = useEth();

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
      <div>
        You are whitelisted. Congrats !
        {workflowStatus === 1 ? <SubmitProposal /> : workflowStatus === 3 ? <SubmitVote /> : 'Nothing to do for now'}
      </div>
    </>
  );
}
