
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Stack, TextField, FormControl, FormLabel, Slider, InputLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, ButtonGroup, Button } from '@mui/material';

function ExposureForm({ isEdit }) {
    useEffect(() => {
        dispatch({ type: 'GET_HIERARCHY' })
        dispatch({ type: 'GET_EXPOSURE' })
    }, []);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const hierarchyList = useSelector(store => store.hierarchy);
    const exposureList = useSelector(store => store.exposure);

    console.log('ExposureForm isEdit:', isEdit)
    console.log('hierarchyList from store', hierarchyList);

    // conditional based on whether or not ExposureForm component is in new or edit exposure mode
    let form = {};
    if (isEdit && exposureList.length > 0) {
        // edits saved form
        // url contains ID for exposure to edit
        const exposureId = useParams().id;
        const editExposure = exposureList.find(exposure => {
            return exposure.id == exposureId;
        })
        //convert date to correct format
        editExposure.date = editExposure.date.slice(0, 10);
        console.log(editExposure.date);
        // set form default to exposure chosen for edit
        form = editExposure; 
    } else {
        // unpopulated form to log new exposure
        // checks whether there's data in useParams & form comes with select situation pre-populated
        form = {
            hierarchy_id: (useParams().id ? useParams().id : ''),
            date: '',
            time: '',
            duration: '',
            pre_suds: 0,
            post_suds: 0,
            peak_suds: 0,
            notes: ''
        }
    }

    const [formValues, setFormValues] = useState(form);

    const submitNewForm = (event) => {
        event.preventDefault();

        console.log('submitNewForm func formValues:', formValues);
        dispatch({ type: 'ADD_EXPOSURE', payload: formValues });
        history.push('/user');
        // setFormValues(emptyForm);
    }

    const submitEdit = (event) => {
        event.preventDefault();
        console.log('submitEdit form:', formValues);
        dispatch({ type: 'EDIT_EXPOSURE', payload: formValues});
        history.push('/user');
        // setFormValues()
    }

    return (
        <form onSubmit={isEdit ? submitEdit : submitNewForm} >
            <Grid container spacing={1} align="center">
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        type="date"
                        label="DATE"
                        value={formValues.date}
                        onChange={(event) => setFormValues({ ...formValues, date: event.target.value })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        type="time"
                        label="time"
                        value={formValues.time}
                        onChange={(event) => setFormValues({ ...formValues, time: event.target.value })}
                    />
                </Grid>
                <Grid item xs={9}>
                    <FormControl sx={{ minWidth: 130 }}>
                        <InputLabel>SITUATION</InputLabel>
                        <Select
                            value={formValues.hierarchy_id}
                            defaultValue={formValues.hierarchy_id}
                            onChange={(event) => setFormValues({ ...formValues, hierarchy_id: event.target.value })}
                        >
                            {hierarchyList.map(situation => (
                                <MenuItem key={situation.id} value={situation.id}>{situation.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        type="number"
                        label="DURATION (min)"
                        value={formValues.duration}
                        onChange={(event) => setFormValues({ ...formValues, duration: event.target.value })}
                    />
                </Grid>
            </Grid>
            <Stack sx={{ width: "80%", minWidth: 300 }}>
                <FormControl >
                    <FormLabel>pre SUDs</FormLabel>
                    <Slider
                        valueLabelDisplay="auto"
                        defaultValue={0}
                        step={5}
                        marks={[{ value: 0, label: 0 }, { value: 10, label: 10 }, { value: 20, label: 20 }, { value: 30, label: 30 }, { value: 40, label: 40 },
                        { value: 50, label: 50 }, { value: 60, label: 60 }, { value: 70, label: 70 }, { value: 80, label: 80 }, { value: 90, label: 90 }, { value: 100, label: 100 }]}
                        min={0}
                        max={100}
                        value={formValues.pre_suds}
                        onChange={(event) => setFormValues({ ...formValues, pre_suds: event.target.value })}
                    />

                    <FormLabel>peak SUDs</FormLabel>
                    <Slider
                        valueLabelDisplay="auto"
                        defaultValue={0}
                        step={5}
                        marks={[{ value: 0, label: 0 }, { value: 10, label: 10 }, { value: 20, label: 20 }, { value: 30, label: 30 }, { value: 40, label: 40 },
                        { value: 50, label: 50 }, { value: 60, label: 60 }, { value: 70, label: 70 }, { value: 80, label: 80 }, { value: 90, label: 90 }, { value: 100, label: 100 }]}
                        min={0}
                        max={100}
                        value={formValues.peak_suds}
                        onChange={(event) => setFormValues({ ...formValues, peak_suds: event.target.value })}
                    />

                    <FormLabel>post SUDs</FormLabel>
                    <Slider
                        valueLabelDisplay="auto"
                        defaultValue={0}
                        step={5}
                        marks={[{ value: 0, label: 0 }, { value: 10, label: 10 }, { value: 20, label: 20 }, { value: 30, label: 30 }, { value: 40, label: 40 },
                        { value: 50, label: 50 }, { value: 60, label: 60 }, { value: 70, label: 70 }, { value: 80, label: 80 }, { value: 90, label: 90 }, { value: 100, label: 100 }]}
                        min={0}
                        max={100}
                        value={formValues.post_suds}
                        onChange={(event) => setFormValues({ ...formValues, post_suds: event.target.value })}
                    />
                </FormControl>
            </Stack>
            <TextField
                variant="outlined"
                color="primary"
                label="NOTES"
                name="notes"
                sx={{ width: "80%", minWidth: 300 }}
                value={formValues.notes}
                onChange={(event) => setFormValues({ ...formValues, notes: event.target.value })}
            />
            {isEdit ?
                <>
                    <Button type="submit">SAVE CHANGES</Button>
                    <Button onClick={() => { history.push('/history') }}>CANCEL</Button>
                </>
                :
                <>
                    <Button type="submit">SAVE</Button>
                    <Button onClick={() => { history.push('/hierarchy') }}>CANCEL</Button>
                </>
            }
        </form>
    )
}


export default ExposureForm;