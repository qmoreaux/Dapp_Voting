import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, justifyContent: "center", display: "flex" }}>
          <Typography>Made by Quentin and Samir for Alyra</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
