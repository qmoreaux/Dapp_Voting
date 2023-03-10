import { useEffect, useState, useCallback } from 'react';

import useEvents from './useEvents';
import useEth from '../contexts/EthContext/useEth';

export default function useStatus() {
  const [status, setStatus] = useState(0);
  const events = useEvents('WorkflowStatusChange');
  const {
    state: { contract, accounts }
  } = useEth();

  const getStatus = useCallback(async () => {
    try {
      const status = await contract.methods
        .workflowStatus()
        .call({ from: accounts[0] });
      setStatus(parseInt(status));
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  useEffect(() => {
    if (contract) {
      getStatus();
    }
  }, [contract, getStatus, events]);

  return status;
}
