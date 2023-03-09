import { Typography } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import useEth from '../../contexts/EthContext/useEth';

export default function Events() {
  const [events, setEvents] = useState([]);
  const {
    state: { contract }
  } = useEth();

  const getOldEvents = useCallback(async () => {
    let oldEvents = await contract.getPastEvents('VoterRegistered', {
      fromBlock: 0,
      toBlock: 'latest'
    });
    setEvents(oldEvents);
  }, [contract]);

  const getEvents = useCallback(async () => {
    await contract.events
      .VoterRegistered({ fromBlock: 'earliest' })
      .on('data', (event) => {
        setEvents([...events, event]);
      })
      .on('changed', (changed) => console.log(changed))
      .on('error', (err) => console.log(err))
      .on('connected', (str) => console.log(str));
  }, [contract, events]);

  useEffect(() => {
    if (contract) {
      // getOldEvents();
      getEvents();
    }
  }, [contract, getOldEvents, getEvents]);

  return (
    <div>
      <Typography variant="h6"> Voters:</Typography>

      {events.map((event) => (
        <Typography key={event.id}>{event.returnValues.voterAddress}</Typography>
      ))}
    </div>
  );
}
