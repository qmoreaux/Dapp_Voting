import { Button, Grid, TextField } from '@mui/material';

import WorkflowButton from './WorkflowButton';

export default function Owner({
  error,
  address,
  setError,
  setAddress,
  addVoter,
  status,
  loading,
  handleWorkflow,
  disabled
}) {
  return (
    <>
      {status === 0 && (
        <Grid item>
          <TextField
            size="small"
            error={error}
            id="outlined-error-helper-text"
            label="Voter Address"
            value={address}
            helperText={error && 'Invalid address'}
            onChange={(event) => {
              setError(false);
              setAddress(event.target.value);
            }}
          />
          <Button variant="contained" onClick={addVoter}>
            Add
          </Button>
        </Grid>
      )}

      <Grid item display={'flex'} justifyContent={'center'}>
        <WorkflowButton loading={loading} status={status} handleWorkflow={handleWorkflow} disabled={disabled} />
      </Grid>
    </>
  );
}
