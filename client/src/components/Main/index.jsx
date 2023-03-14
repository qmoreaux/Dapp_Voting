import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Admin from './Admin';
import Voter from './Voter';
import Search from './Search';
import Events from './Events';
import HorizontalStepper from './Stepper';

import useEth from '../../contexts/EthContext/useEth';
import useOwner from '../../hooks/useOwner';
import useEvents from '../../hooks/useEvents';
import useStatus from '../../hooks/useStatus';
export default function Main() {
  const {
    state: { contract, accounts, web3 }
  } = useEth();
  const registeredEvents = useEvents('VoterRegistered');
  const proposalEvents = useEvents('ProposalRegistered');
  const votedEvents = useEvents('Voted');
  const owner = useOwner();
  const status = useStatus();

  const [whitelist, setWhitelist] = useState(false);

  const [metamask, setMetamask] = useState(false);

  useEffect(() => {
    let whitelisted = false;
    registeredEvents.forEach((event) => {
      if (event.returnValues.voterAddress === accounts[0]) {
        setWhitelist(true);
        whitelisted = true;
      }
    });
    if (!whitelisted) {
      setWhitelist(false);
    }
  }, [accounts, registeredEvents]);

  useEffect(() => {
    if (window.ethereum) {
      setMetamask(true);
    }
  }, []);

  return (
    <Container maxWidth="xl" className="container-main">
      {metamask ? (
        <>
          {accounts ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                  <Admin
                    contract={contract}
                    accounts={accounts}
                    web3={web3}
                    owner={accounts && accounts[0] === owner}
                    status={status}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Voter whitelist={whitelist} contract={contract} accounts={accounts} status={status} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Search whitelist={whitelist} contract={contract} accounts={accounts} web3={web3} />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <HorizontalStepper />
                </Grid>
                <Grid item xs={12}>
                  <Events
                    registeredEvents={registeredEvents}
                    proposalEvents={proposalEvents}
                    votedEvents={votedEvents}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography>Please connect your wallet to use this application</Typography>
          )}
        </>
      ) : (
        <Typography>Please install Metamask to use this application</Typography>
      )}
    </Container>
  );
}
