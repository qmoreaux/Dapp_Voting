import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Footer() {
  return (
    <AppBar position="fixed" color="primary" className="footer">
      <Toolbar>
        <Box className="footer-content">
          <Typography variant="body2">Made by Quentin and Samir for Alyra</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
