import { Container } from "@mui/material";
import * as React from "react";
import Admin from "./Admin";
import Voter from './Voter';
import Search from './Search';
import Events from "./Events";
import HorizontalStepper from "./Stepper";

export default function Main() {
  return (
    <Container maxWidth="xl">
      <HorizontalStepper />
      <Admin />
      <Voter />
      <Search />
      <Events />
    </Container>
  );
}
