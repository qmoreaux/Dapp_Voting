import { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';

import Admin from './Admin';
import Voter from './Voter';
import Search from './Search';
import Events from './Events';
import HorizontalStepper from './Stepper';

import useEth from '../../contexts/EthContext/useEth';
import useApp from '../../contexts/AppContext/useApp';

export default function Main() {
  const {
    state: { contract, accounts, web3 }
  } = useEth();

  const {
    state: { status, whitelisted }
  } = useApp();

  const [metamask, setMetamask] = useState(false);

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
                  <Admin contract={contract} accounts={accounts} web3={web3} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Voter whitelist={whitelisted} contract={contract} accounts={accounts} status={status} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <Search whitelist={whitelisted} contract={contract} accounts={accounts} web3={web3} />
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
