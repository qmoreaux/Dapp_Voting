import { Card, CardContent, Grid, Typography } from '@mui/material';

import EventList from './EventList';

export default function Events() {
  return (
    <Card className="events">
      <CardContent>
        <Typography variant="h6">Events</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <EventList
              title="Voters"
              elements={['voterAddress']}
              event="VoterRegistered"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <EventList
              title="Proposals"
              elements={['proposalId']}
              event="ProposalRegistered"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <EventList
              title="Votes"
              elements={['proposalId', 'voter']}
              event="Voted"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
