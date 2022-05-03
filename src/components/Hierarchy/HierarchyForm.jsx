import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, FormControl, IconButton, FormLabel, InputLabel, FormControlLabel, Select, MenuItem, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

function HierarchyForm() {
    // FIXME: target_id will come from url params
    const emptyForm = {
        target_id: '',
        description: '',
        rating: ''
    }

    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(emptyForm)

    useEffect(() => {
        dispatch({ type: 'GET_HIERARCHY' });
    }, []);

    const submitHierarchyForm = (event) => {
        event.preventDefault();
        console.log('submitTargetForm formValues:', formValues);
        dispatch({ type: 'ADD_HIERARCHY', payload: formValues });
        setFormValues(emptyForm);

    }

    return (
        <form onSubmit={submitHierarchyForm}>
            <Grid container spacing={2} justifyContent="flex-start" sx={{mt:1, mb:1, ml:1}}>
                <Grid item xs={12} sm={8} >
                    <TextField
                        required
                        label="Add new situation to hierarchy"
                        variant="outlined"
                        value={formValues.description}
                        onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
                        sx={{ minWidth:350}}
                    />
                </Grid>
                <Grid item xs={2} sm={2}>
                    <FormControl required sx={{ minWidth:100}}>
                        <InputLabel>Rating</InputLabel>
                        <Select
                            value={formValues.rating}
                            label="Rating"
                            onChange={(event) => setFormValues({ ...formValues, rating: event.target.value })}
                        >
                            <MenuItem key={1} value={1}>{1}</MenuItem>
                            <MenuItem key={2} value={2}>{2}</MenuItem>
                            <MenuItem key={3} value={3}>{3}</MenuItem>
                            <MenuItem key={4} value={4}>{4}</MenuItem>
                            <MenuItem key={5} value={5}>{5}</MenuItem>
                            <MenuItem key={6} value={6}>{6}</MenuItem>
                            <MenuItem key={7} value={7}>{7}</MenuItem>
                            <MenuItem key={8} value={8}>{8}</MenuItem>
                            <MenuItem key={9} value={9}>{9}</MenuItem>
                            <MenuItem key={10} value={10}>{10}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={1} sx={{ml:6}}>
                    <IconButton type="submit">
                        <Add />
                    </IconButton>
                </Grid>
            </Grid>
        </form>
    )
}

export default HierarchyForm;