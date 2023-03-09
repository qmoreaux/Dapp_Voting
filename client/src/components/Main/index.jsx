import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import * as React from 'react';
import Admin from './Admin';
import Voter from './Voter';
import Search from './Search';
import Events from './Events';
import HorizontalStepper from './Stepper';

export default function Main() {
  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: 100, marginBottom: 100 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Admin />
          </Grid>
          <Grid item xs={4}>
            <Voter />
          </Grid>
          <Grid item xs={4}>
            <Search />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        <HorizontalStepper />
        <Events />
      </Container>
    </>
  );
}
