import { Card, CardContent, Grid, Typography } from '@mui/material';

import useApp from '../../../contexts/AppContext/useApp';

import EventList from './EventList';

export default function Events() {

  const {
    state: { registeredEvents, proposalEvents, votedEvents }
  } = useApp();

  return (
    <Card className="events">
      <CardContent>
        <Typography variant="h6">Events</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <EventList
              title="Voters"
              elements={['voterAddress']}
              events={registeredEvents}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <EventList
              title="Proposals"
              elements={['proposalId']}
              events={proposalEvents}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <EventList
              title="Votes"
              elements={['proposalId', 'voter']}
              events={votedEvents}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
