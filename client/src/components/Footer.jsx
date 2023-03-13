import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

export default function Footer() {
  return (
    <AppBar position="fixed" color="primary" className="footer">
      <Toolbar>
        <Box className="footer-content">
          <Typography>Made by Quentin and Samir for Alyra</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
