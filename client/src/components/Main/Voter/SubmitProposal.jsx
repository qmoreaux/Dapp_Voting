import { useState } from 'react';

import { Grid, TextField, Button } from '@mui/material';

export default function SubmitProposal({contract, accounts}) {

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
          height="100%"
          display={'flex'}
          flexDirection="column"
          justifyContent={'center'}
          container
          spacing={2}
        >
            <Grid item display={'flex'} justifyContent={'center'}>
              <TextField
                sx={{ mr: 1 }}
                fullWidth
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
