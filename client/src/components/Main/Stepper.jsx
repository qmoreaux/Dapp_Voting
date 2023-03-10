import { Box, Stepper, Step, StepLabel } from '@mui/material';

import useStatus from '../../hooks/useStatus';

const steps = [
  'Voters Registration',
  'Proposals Registration',
  'Voting Session',
  'Votes Tallied'
];

export default function HorizontalStepper() {
  const status = useStatus();

  return (
    <Box sx={{ width: '100%', mt: 6 }}>
      <Stepper activeStep={status} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
