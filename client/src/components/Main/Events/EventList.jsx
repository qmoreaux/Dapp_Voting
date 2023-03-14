import { Stack, Typography } from '@mui/material';

export default function EventList({ title, elements, events }) {
  return (
    <Stack>
      <Typography variant="h6">{title}</Typography>
      {events.map((event) => (
        <Typography key={event.id}>
          {elements.map((elt) => (
            <span style={{ marginRight: 10 }} key={elt}>
              {event.returnValues[elt]}
            </span>
          ))}
        </Typography>
      ))}
    </Stack>
  );
}
