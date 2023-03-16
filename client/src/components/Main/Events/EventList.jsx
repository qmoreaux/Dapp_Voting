import { Stack, Typography } from '@mui/material';

export default function EventList({ title, type, events }) {
  function getShortAddress(address) {
    return address.substring(0, 5) + '...' + address.substring(address.length - 4);
  }

  return (
    <Stack>
      <Typography key="title" variant="h6">
        {title}
      </Typography>
      {events.map((event) => (
        <Typography key={event.id}>
          {type === 'voters' ? (
            <>
              {event.returnValues.new ? 'New voter' : 'Voter'} registered :{' '}
              <b>{getShortAddress(event.returnValues.voterAddress)}</b>
            </>
          ) : (
            <>
              {type === 'proposals' ? (
                <>
                  {event.returnValues.new ? 'New proposal' : 'Proposal'} submitted{' '}
                  <b>{event.returnValues.proposalId}</b> : {event.returnValues.description}
                </>
              ) : (
                <>
                  {event.returnValues.new ? 'New vote' : 'Vote'} submitted :{' '}
                  <b>{getShortAddress(event.returnValues.voter)}</b> voted for proposal{' '}
                  <b>{event.returnValues.proposalId}</b>
                </>
              )}
            </>
          )}
        </Typography>
      ))}
    </Stack>
  );
}
