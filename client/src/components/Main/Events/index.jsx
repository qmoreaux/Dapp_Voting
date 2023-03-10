import { Grid } from '@mui/material';

import EventList from './EventList';

export default function Events() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <EventList
          title="Voters"
          element="voterAddress"
          event="VoterRegistered"
        />
      </Grid>
      <Grid item xs={4}>
        <EventList
          title="Proposals"
          element="proposalId"
          event="ProposalRegistered"
        />
      </Grid>
      <Grid item xs={4}>
        <EventList title="Votes" element="voter" event="Voted" />
      </Grid>
    </Grid>
  );
}
