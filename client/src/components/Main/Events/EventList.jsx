import { Typography } from '@mui/material';

import useEvents from '../../../hooks/useEvents';

export default function EventList({ title, element, event }) {
  const events = useEvents(event);

  return (
    <>
      <Typography variant="h6">{title}</Typography>

      {events.map((event) => (
        <Typography key={event.id}>{event.returnValues[element]}</Typography>
      ))}
    </>
  );
}
