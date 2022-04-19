import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Grid, TextField, Button } from '@mui/material';

function TargetForm() {
    const emptyForm = { description: ''
                        }

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(emptyForm)

    useEffect(() => {
        dispatch({type: 'GET_TARGET'});
    }, []);

    const submitTargetForm = (event) => {
        event.preventDefault();
        console.log('submitTargetForm formValues:', formValues);
        dispatch({type: 'ADD_TARGET', payload: formValues});
        setFormValues(emptyForm);
    }
    
    return (
        <form onSubmit={submitTargetForm}>
            <Grid container>
                <Grid item>
                    <TextField
                        label="Target Fear"
                        variant="outlined"
                        value={formValues.description}
                        onChange={(event) => setFormValues({...formValues, description: event.target.value})}
                    />
                </Grid>
                <Button type="submit">
                    ADD
                </Button>
            </Grid>
        </form>
    )
}

export default TargetForm;