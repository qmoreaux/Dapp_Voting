import * as React from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";

const steps = [
  "Voters Registration",
  "Proposals Registration",
  "Voting Session",
  "Votes Tallied",
];

export default function HorizontalStepper() {
  return (
    <Box sx={{ width: "100%", mt: 6 }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
