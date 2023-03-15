import { useEffect, useState, useCallback } from 'react';

import useEth from '../contexts/EthContext/useEth';

export default function useEvents(eventName) {
  const [events, setEvents] = useState([]);
  const {
    state: { contract }
  } = useEth();

  const getOldEvents = useCallback(async () => {
    let oldEvents = await contract.getPastEvents(eventName, {
      fromBlock: 'earliest',
      toBlock: 'latest'
    });
    setEvents(oldEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  const getEvents = useCallback(async () => {
    await contract.events[eventName]({ fromBlock: 'earliest' })
      .on('data', (event) => {
        console.log(`New event of type ${eventName} received : ${JSON.stringify(event)}`);
        setEvents([...events, event]);
      })
      .on('changed', (changed) => console.log(`Event ${eventName} changed: ${changed}`))
      .on('error', (err) => console.error(`Error with event ${eventName}: ${err}`))
      .on('connected', (str) => console.log(`Connected to ${eventName}: ${str}`));
  }, [contract, events, eventName]);

  useEffect(() => {
    if (contract) {
      getOldEvents();
    }
  }, [contract, getOldEvents]);

  useEffect(() => {
    if (contract) {
      getEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return events;
}
