import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, TextField, FormControl, FormLabel, Slider, InputLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, ButtonGroup, Button } from '@mui/material';

function ExposureForm () {
    const emptyForm = { hierarchy_id: '',
                        date: '',
                        time: '',
                        duration: '',
                        pre_suds: 0,
                        post_suds: 0,
                        peak_suds: 0,
                        notes: ''
                      }
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(emptyForm); 
    const hierarchyList = useSelector(store  => store.hierarchy);
    console.log('hierarchyList from store', hierarchyList); 
    
    useEffect(() => {
        dispatch({type: 'GET_HIERARCHY'})
    }, []);  

    const submitExposureForm = (event) => {
        event.preventDefault();

        console.log('submitForm func formValues:', formValues);
        dispatch({type: 'ADD_EXPOSURE', payload: formValues});
        setFormValues(emptyForm);
    }
    
    return (
        <form onSubmit={submitExposureForm}>
            <Grid container spacing={1}>
                <Grid item>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        type="date"
                        label="DATE"
                        value={formValues.date}
                        onChange={(event) => setFormValues({...formValues, date: event.target.value})}
                    />
                </Grid>
                <Grid item>    
                    <TextField
                            variant="outlined"
                            color="secondary"
                            type="time"
                            label="time"
                            value={formValues.time}
                            onChange={(event) => setFormValues({...formValues, time: event.target.value})}
                        />
                </Grid>
                <Grid item>
                <TextField
                        variant="outlined"
                        color="secondary"
                        type="number"
                        label="DURATION (min)"
                        value={formValues.duration}
                        onChange={(event) => setFormValues({...formValues, duration: event.target.value})}
                    />
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel>SITUATION</InputLabel>
                        <Select
                            value={formValues.hierarchy_id}
                            onChange={(event) => setFormValues({...formValues, hierarchy_id: event.target.value})}
                        >
                            {hierarchyList.map(situation => (
                            <MenuItem key={situation.id} value={situation.id}>{situation.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8}>
                    <FormControl>
                        <FormLabel>pre SUDs</FormLabel>
                        <Slider 
                            defaultValue={0}
                            step={10}
                            marks={[{value:0, label:0}, {value:10, label:10}, {value:20, label:20}, {value:30, label:30}, {value:40, label:40}, 
                                    {value:5, label:5}, {value:6, label:6}, {value:7, label:7}, {value:8, label:8}, {value:90, label:90}, {value:100, label:100}]}
                            min={0}
                            max={100}
                            value={formValues.pre_suds}
                            onChange={(event) => setFormValues({...formValues, pre_suds: event.target.value})}
                        />
                        
                        <FormLabel>peak SUDs</FormLabel>
                        <Slider 
                            defaultValue={0}
                            step={1}
                            marks={[{value:0, label:0}, {value:1, label:1}, {value:2, label:2}, {value:3, label:3}, {value:4, label:4}, 
                                    {value:5, label:5}, {value:6, label:6}, {value:7, label:7}, {value:8, label:8}, {value:9, label:9}, {value:10, label:10}]}
                            min={0}
                            max={10}
                            value={formValues.peak_suds}
                            onChange={(event) => setFormValues({...formValues, peak_suds: event.target.value})}
                        />

                        <FormLabel>post SUDs</FormLabel>
                        <Slider 
                            defaultValue={0}
                            step={1}
                            marks={[{value:0, label:0}, {value:1, label:1}, {value:2, label:2}, {value:3, label:3}, {value:4, label:4}, 
                                    {value:5, label:5}, {value:6, label:6}, {value:7, label:7}, {value:8, label:8}, {value:9, label:9}, {value:10, label:10}]}
                            min={0}
                            max={10}
                            value={formValues.post_suds}
                            onChange={(event) => setFormValues({...formValues, post_suds: event.target.value})}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="NOTES"
                        name="notes"
                        value={formValues.notes}
                        onChange={(event) => setFormValues({...formValues, notes: event.target.value})}
                    />
                </Grid>
                <Button>CANCEL</Button>
                <Button type="submit">LOG</Button>
            </Grid>
        </form>
    )
}

export default ExposureForm;