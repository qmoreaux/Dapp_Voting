import { Typography } from '@mui/material';

import useEvents from '../../../hooks/useEvents';

export default function EventList({ title, elements, event }) {
  const events = useEvents(event);

  return (
    <>
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
    </>
  );
}
