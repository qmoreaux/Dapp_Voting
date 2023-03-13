import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export default function Header() {
  const {
    state: { accounts }
  } = useEth();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (accounts) {
      let address = accounts[0].split('');

      const concatAddress = [
        ...address.splice(0, 4),
        '..............',
        ...address.splice(address.length - 4, 4)
      ];
      setAddress(concatAddress.join(''));
    }
  }, [accounts]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className="header-logo">
            Projet3
          </Typography>
          <Typography>{address}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
