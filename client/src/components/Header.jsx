import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useEth from "../contexts/EthContext/useEth";

export default function Header() {
  const {
    state: { accounts },
  } = useEth();

  console.log(accounts && accounts[0]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Projet3
          </Typography>
          <Typography>{accounts && accounts[0]}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
