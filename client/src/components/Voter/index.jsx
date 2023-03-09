import { useEffect, useState, useCallback } from 'react';

import Whitelisted from './Whitelisted'
import NotWhitelisted from './NotWhitelisted'
import useEth from '../../contexts/EthContext/useEth';

export default function Voter() {
  const {
    state: { contract, accounts }
  } = useEth();

  const [whitelist, setWhitelist] = useState(false);

  const getOldEvents = useCallback(async () => {
    let oldEvents = await contract.getPastEvents('VoterRegistered', {
      fromBlock: 0,
      toBlock: 'latest'
    });
    oldEvents.forEach((event) => {
      if (event.returnValues.voterAddress === accounts[0]) {
        setWhitelist(true);
      }
    });
  }, [contract, accounts]);

  const getNewEvents = useCallback(async () => {
    await contract.events
          .VoterRegistered({ fromBlock: 'earliest' })
          .on('data', (event) => {
            if (event.returnValues.voterAddress === accounts[0]) {
              setWhitelist(true);
            }
          })
          .on('changed', (changed) => console.log(changed))
          .on('error', (err) => console.log(err))
          .on('connected', (str) => console.log(str));
  }, [contract, accounts]);

  useEffect(() => {
    if (contract && accounts) {
      getOldEvents();
      getNewEvents();
    }
  }, [contract, accounts, getOldEvents, getNewEvents]);

  return (
    <>
      <div>
      {
        whitelist ? <Whitelisted /> : <NotWhitelisted />
      }
      </div>
    </>
  );
}
