import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, ButtonGroup, Button } from '@mui/material';

function ExposureForm () {
    const emptyForm = { situation: '',
                        date: '',
                        time: '',
                        duration: '',
                        preSuds: '',
                        postSuds: '',
                        peakSuds: '',
                        notes: ''
                      }
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(emptyForm); 
    const hierarchyList = useSelector(store  => store.hierarchy);
    console.log('hierarchyList from store', hierarchyList); 
    
    useEffect(() => {
        dispatch({type: 'GET_HIERARCHY'})
    }, []);  

    const submitForm = (event) => {
        event.preventDefault();
        console.log('submitForm func');
        dispatch({type: 'ADD_EXPOSURE', payload: formValues});
        setFormValues(emptyForm);
    }
    
    return (
        <form>
            <Grid container>
                <Grid item>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        type="date"
                        label="DATE"
                    />
                </Grid>
                <Grid item>    
                    <FormControl>
                        <FormLabel>TIME OF DAY</FormLabel>
                        <RadioGroup 
                            row={true}
                            onChange={(event) => setFormValues({...formValues, time: event.target.value})}
                        >
                            <FormControlLabel value="1" control={<Radio/>} label="MORNING"/>
                            <FormControlLabel value="2" control={<Radio/>} label="MIDDAY"/>
                            <FormControlLabel value="3" control={<Radio/>} label="EVENING"/>
                            <FormControlLabel value="4" control={<Radio/>} label="NIGHT"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <Select
                            value={2}
                            onChange={(event) => setFormValues({...formValues, situation: event.target.value})}
                        >
                            {hierarchyList.map(situation => (
                            <MenuItem key={situation.id} value={situation.id}>{situation.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            {/* <form onSubmit={submitForm}>
                <select name="situation">
                    {hierarchyList.map(situation => (
                        <option key={situation.id} value={situation.id}>{situation.description}</option>
                    ))}
                </select>
                <button type="submit">LOG</button>
            </form> */}
                <TextField
                    variant="outlined"
                    color="primary"
                    label="NOTES"
                    name="notes"
                    value={formValues.notes}
                    onChange={(event) => setFormValues({...formValues, notes: event.target.value})}
                />
                <Button>CANCEL</Button>
                <Button type="submit">LOG</Button>
            </Grid>
        </form>
    )
}

export default ExposureForm;