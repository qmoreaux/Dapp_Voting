import { Box, Stepper, Step, StepLabel } from '@mui/material';
import useApp from '../../contexts/AppContext/useApp';

const steps = [
  'Voters Registration',
  'Proposals Registration',
  'Proposals Registration ended',
  'Voting Session',
  'Voting Session ended',
  'Votes Tallied'
];

export default function HorizontalStepper() {
  const {
    state: { status }
  } = useApp();

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
