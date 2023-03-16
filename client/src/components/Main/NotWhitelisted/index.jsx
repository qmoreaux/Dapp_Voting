import { Grid, Typography } from '@mui/material';

export default function NotWhitelisted() {
  return (
    <Grid>
      <Grid item>
        <Typography>
          These functionnalities are only available to whitelisted users.
          <br />
          Please ask an admin to whitelist your account to use this application.
        </Typography>
      </Grid>
    </Grid>
  );
}
