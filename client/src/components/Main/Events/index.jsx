import { Grid } from '@mui/material';

import EventList from './EventList';

export default function Events() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <EventList
          title="Voters"
          elements={['voterAddress']}
          event="VoterRegistered"
        />
      </Grid>
      <Grid item xs={4}>
        <EventList
          title="Proposals"
          elements={['proposalId']}
          event="ProposalRegistered"
        />
      </Grid>
      <Grid item xs={4}>
        <EventList
          title="Votes"
          elements={['proposalId', 'voter']}
          event="Voted"
        />
      </Grid>
    </Grid>
  );
}
