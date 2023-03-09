import { Container } from "@mui/material";
import * as React from "react";
import Admin from "./Admin";
import Events from "./Events";

export default function Main() {
  return (
    <Container maxWidth="xl">
      <Admin />
      <Events />
    </Container>
  );
}
