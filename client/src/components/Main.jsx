import { Container } from "@mui/material";
import * as React from "react";
import Admin from "./Admin";
import Events from "./Events";
import HorizontalStepper from "./Stepper";

export default function Main() {
  return (
    <Container maxWidth="xl">
      <HorizontalStepper />
      <Admin />
      <Events />
    </Container>
  );
}
