import * as React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export default function Header() {
  const {
    state: { accounts },
    tryInit
  } = useEth();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (accounts) {
      let _address = accounts[0];

      setAddress(_address.substring(0, 5) + '...' + _address.substring(_address.length - 4));
    }
  }, [accounts]);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isConnected()) {
      tryInit();
    }
  });

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <img src="/logo.png" alt="logo" />
          </Box>
          {address ? <Typography>{address}</Typography> : <Button onClick={tryInit}>Connect</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
