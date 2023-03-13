import * as React from 'react';

import { LoadingButton } from '@mui/lab';

export default function WorkflowButton({ loading, status, handleWorkflow }) {
  const getTitle = () => {
    switch (status) {
      case 0:
        return 'Start Proposal registering';
      case 1:
        return 'End Proposal registering';
      case 2:
        return 'Start voting session';
      case 3:
        return 'End voting session';
      case 4:
        return 'Tally votes';
      default:
        return 'Closed';
    }
  };

  return (
    <LoadingButton loading={loading} variant="contained" onClick={handleWorkflow} disabled={status === 5}>
      {getTitle()}
    </LoadingButton>
  );
}
