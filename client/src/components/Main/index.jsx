import { useState, useCallback, useEffect } from 'react';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import Admin from './Admin';
import Voter from './Voter';
import Search from './Search';
import Events from './Events';
import HorizontalStepper from './Stepper';

import useEth from '../../contexts/EthContext/useEth';

export default function Main() {
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
    <Container maxWidth="xl" style={{ marginTop: 100, marginBottom: 100 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Admin />
        </Grid>
        <Grid item xs={4}>
          <Voter whitelist={whitelist} />
        </Grid>
        <Grid item xs={4}>
          <Search whitelist={whitelist} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HorizontalStepper />
        </Grid>
        <Grid item xs={12}>
          <Events />
        </Grid>
      </Grid>
    </Container>
  );
}
