import { useState } from 'react';

import { Grid, TextField, Button } from '@mui/material';

export default function SubmitProposal({ contract, accounts }) {
  const [description, setDescription] = useState('');

  async function submitProposal() {
    try {
      await contract.methods.addProposal(description).send({ from: accounts[0] });
      setDescription('');
      console.log('success');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid
      width="calc(100% - 80px)"
      height="100%"
      display={'flex'}
      flexDirection="column"
      justifyContent={'center'}
      container
    >
      <Grid item display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          multiline
          rows={4}
          size="small"
          label="Proposal description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <Button variant="contained" onClick={submitProposal}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
