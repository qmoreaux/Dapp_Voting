import { useState } from 'react';

import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { actions } from '../../../contexts/AppContext/state';
import useApp from '../../../contexts/AppContext/useApp';

export default function SubmitProposal({ contract, accounts }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const { dispatch } = useApp();

  async function submitProposal() {
    setLoading(true);
    try {
      await contract.methods.addProposal(description).call({ from: accounts[0] });
      await contract.methods.addProposal(description).send({ from: accounts[0] });
      setDescription('');

      dispatch({
        type: actions.setAlert,
        data: {
          message: `Proposal added : ${description}`,
          severity: 'success'
        }
      });
    } catch (error) {
      dispatch({
        type: actions.setAlert,
        data: {
          message: error.message,
          severity: 'error'
        }
      });
    }
    setLoading(false);
  }

  return (
    <Grid container>
      <Grid item>
        <TextField
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

        <LoadingButton loading={loading} disabled={!description.length} variant="contained" onClick={submitProposal}>
          Submit
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
