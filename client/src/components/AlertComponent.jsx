import { useEffect, useState } from 'react';

import { Snackbar, Alert } from '@mui/material';
import useApp from '../contexts/AppContext/useApp';

function AlertComponent() {
  const {
    state: { alerts }
  } = useApp();

  const [open, setOpen] = useState(false);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [alerts]);

  return (
    <>
      {alerts.map((alert) => (
        <div>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            key={alert.message}
            message={alert.message}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert severity={alert.severity}>{alert.message}</Alert>
          </Snackbar>
        </div>
      ))}
    </>
  );
}

export default AlertComponent;
