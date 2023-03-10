import { useEffect, useState } from 'react';
import AlertContext from './AlertContext';

import { Snackbar, Alert } from '@mui/material';

const AUTO_DISMISS = 5000;

function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const activeAlertIds = alerts.join(',');
  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const timer = setTimeout(() => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)), AUTO_DISMISS);
      return () => clearTimeout(timer);
    }
  }, [activeAlertIds]);

  const addAlert = (alert) => setAlerts((alerts) => [alert, ...alerts]);

  const value = { addAlert };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alerts.map((alert) => (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
          key={alert.message}
          message={alert.message}
        >
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      ))}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
