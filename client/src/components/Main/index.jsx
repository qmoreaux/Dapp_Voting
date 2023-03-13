import { useState, useCallback, useEffect } from 'react';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import Admin from './Admin';
import Voter from './Voter';
import Search from './Search';
import Events from './Events';
import HorizontalStepper from './Stepper';

import useEth from '../../contexts/EthContext/useEth';
import useAlert from '../../contexts/AlertContext/useAlert';

export default function Main() {
  const {
    state: { contract, accounts, web3 }
  } = useEth();
  const { addAlert } = useAlert();

  const [whitelist, setWhitelist] = useState(false);
  const [owner, setOwner] = useState('');

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

  const getOwner = useCallback(async () => {
    try {
      let owner = await contract.methods.owner().call({ from: accounts[0] });
      setOwner(owner);
    } catch (error) {
      console.error(error);
      addAlert({ message: error.message, severity: 'error' });
    }
  }, [contract, accounts, addAlert]);

  useEffect(() => {
    if (contract && accounts) {
      setWhitelist(false);
      getOldEvents();
      getNewEvents();
      getOwner();
    }
  }, [contract, accounts, getOldEvents, getNewEvents, getOwner]);

  return (
    <Container maxWidth="xl" className="container-main">
      <Grid container spacing={2}>
        {accounts && accounts[0] === owner && (
          <Grid item xs={4}>
            <Admin contract={contract} accounts={accounts} web3={web3} />
          </Grid>
        )}

        <Grid item xs={4}>
          <Voter
            whitelist={whitelist}
            contract={contract}
            accounts={accounts}
          />
        </Grid>
        <Grid item xs={4}>
          <Search
            whitelist={whitelist}
            contract={contract}
            accounts={accounts}
            web3={web3}
          />
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
