import * as React from 'react';

import { LoadingButton } from '@mui/lab';
import useEvents from '../../../hooks/useEvents';

export default function WorkflowButton({ loading, status, handleWorkflow }) {
  const proposalEvents = useEvents('ProposalRegistered');
  const votedEvents = useEvents('Voted');

  const disabled =
    votedEvents.length === 0 || proposalEvents.length === 0 || status === 5;

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
    <LoadingButton
      loading={loading}
      variant="contained"
      onClick={handleWorkflow}
      disabled={disabled}
    >
      {getTitle()}
    </LoadingButton>
  );
}
