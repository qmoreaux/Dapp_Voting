import { Stack, Typography } from '@mui/material';

export default function EventList({ title, type, events }) {
  function getShortAddress(address) {
    return address.substring(0, 5) + '...' + address.substring(address.length - 4);
  }

  return (
    <Stack>
      <Typography variant="h6">{title}</Typography>
      {events.map((event) => (
        <>
          {type === 'voters' ? (
            <Typography key={event.id}>
              {event.returnValues.new ? 'New voter' : 'Voter'} registered :{' '}
              <b>{getShortAddress(event.returnValues.voterAddress)}</b>
            </Typography>
          ) : (
            <>
              {type === 'proposals' ? (
                <Typography key={event.id}>
                  {event.returnValues.new ? 'New proposal' : 'Proposal'} submitted{' '}
                  <b>{event.returnValues.proposalId}</b> : {event.returnValues.description}
                </Typography>
              ) : (
                <Typography key={event.id}>
                  {event.returnValues.new ? 'New vote' : 'Vote'} submitted :{' '}
                  <b>{getShortAddress(event.returnValues.voter)}</b> voted for proposal{' '}
                  <b>{event.returnValues.proposalId}</b>
                </Typography>
              )}
            </>
          )}
        </>
      ))}
    </Stack>
  );
}
