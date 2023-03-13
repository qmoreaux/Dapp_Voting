import { Box, Stepper, Step, StepLabel } from '@mui/material';

import useStatus from '../../hooks/useStatus';

const steps = [
  'Voters Registration',
  'Proposals Registration',
  'Proposals Registration ended',
  'Voting Session',
  'Voting Session ended',
  'Votes Tallied'
];

export default function HorizontalStepper() {
  const status = useStatus();

  return (
    <Box className="stepper">
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
