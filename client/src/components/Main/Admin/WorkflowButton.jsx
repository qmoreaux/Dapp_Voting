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
        return 'Start voting sessing';
      case 3:
        return 'End voting sessing';
      default:
        return 'Not valid';
    }
  };

  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      onClick={handleWorkflow}
    >
      {getTitle()}
    </LoadingButton>
  );
}
