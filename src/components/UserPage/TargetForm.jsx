import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

function TargetForm() {
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState('');

    const submitTargetForm = () => {
        console.log('submitTargetForm value:', formValue);
        dispatch({ type: 'ADD_TARGET', payload: { fear: formValue } });
        setFormValue('');
      }

    return (
        <Box>
            <form onSubmit={submitTargetForm}>
                <TextField
                    label="Add new target fear"
                    variant="outlined"
                    value={formValue}
                    sx={{ minWidth: 320 }}
                    onChange={(event) => setFormValue(event.target.value)}
                />
                <IconButton type='submit'>
                    <Add />
                </IconButton>
            </form>
        </Box>
    )
}

export default TargetForm;