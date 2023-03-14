import { useEffect, useState } from 'react';

import useEth from '../contexts/EthContext/useEth';
import useAlert from '../contexts/AlertContext/useAlert';
import { useCallback } from 'react';

export default function useOwner() {
  const [owner, setOwner] = useState('');

  const {
    state: { contract, accounts }
  } = useEth();

  const { addAlert } = useAlert();

  const updateOwner = useCallback(async (owner) => {
    setOwner(owner);
  }, []);

  useEffect(() => {
    const tryGetOwner = async () => {
      try {
        let owner = await contract.methods.owner().call({ from: accounts[0] });
        updateOwner(owner);
      } catch (error) {
        addAlert({ message: error.message, severity: 'error' });
      }
    };
    if (contract && accounts) {
      tryGetOwner();
    }
  }, [contract, accounts, owner, addAlert, updateOwner]);

  return owner;
}
