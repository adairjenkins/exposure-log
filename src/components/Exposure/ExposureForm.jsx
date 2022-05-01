
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, Stack, Container, Box, TextField, FormControl, FormLabel, Slider, InputLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, ButtonGroup, Button } from '@mui/material';

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
        console.log('FORM:', form);
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
        history.push('/home');
        // setFormValues(emptyForm);
    }

    const submitEdit = (event) => {
        event.preventDefault();
        console.log('submitEdit form:', formValues);
        dispatch({ type: 'EDIT_EXPOSURE', payload: formValues });
        history.push('/home');
        // setFormValues()
    }

    const deleteExposure = (id) => {
        console.log('deleteExposure id:', id);
        dispatch({ type: 'DELETE_EXPOSURE', payload: id });
        history.push('/history');
    }

    const secretButtonDateTime = () => {
        console.log('secret button');
        setFormValues({ ...formValues, time: '11:00', date: '2022-05-02' });
    }

    const secretButtonDuration = () => {
        console.log('secret button');
        setFormValues({ ...formValues, duration: '20' });
    }

    const secretButtonDistress = () => {
        console.log('secret button');
        setFormValues({...formValues, pre_suds: 30, peak_suds: 40, post_suds: 20 });
    }

    return (
        <Box maxWidth="md" sx={{ margin: 3, mb: 10 }}>
            <form onSubmit={isEdit ? submitEdit : submitNewForm} >
                <Stack sx={{ marginTop: 2 }} direction="row" spacing={2}>
                    <TextField
                        required
                        variant="outlined"
                        color="secondary"
                        type="date"
                        // label="DATE"
                        value={formValues.date}
                        onChange={(event) => setFormValues({ ...formValues, date: event.target.value })}
                    />
                    <TextField
                        required
                        variant="outlined"
                        color="secondary"
                        type="time"
                        // label="time"
                        value={formValues.time}
                        onChange={(event) => setFormValues({ ...formValues, time: event.target.value })}
                    />
                    <Box sx={{ width: 10, height:50}} onClick={secretButtonDateTime}></Box>
                </Stack>
                <Stack sx={{ marginTop: 2 }} spacing={2}>
                    <FormControl sx={{ maxWidth: 600, width: "100%" }} required>
                        <InputLabel>Situation</InputLabel>
                        <Select
                            label="Situation"
                            value={formValues.hierarchy_id}
                            defaultValue={formValues.hierarchy_id}
                            onChange={(event) => setFormValues({ ...formValues, hierarchy_id: event.target.value })}
                        >
                            {hierarchyList.map(situation => (
                                <MenuItem key={situation.id} value={situation.id}>{situation.rating}. {situation.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Stack direction="row">
                        <TextField
                            sx={{ width: 150 }}
                            required
                            variant="outlined"
                            color="secondary"
                            type="number"
                            label="Duration (min)"
                            value={formValues.duration}
                            onChange={(event) => setFormValues({ ...formValues, duration: event.target.value })}
                        />
                        <Box sx={{ width: 50, height: 50}} onClick={secretButtonDuration}></Box>
                    </Stack>
                    <FormControl sx={{ maxWidth: 600, width: "97%" }} required>
                        <Box sx={{ ml: 1 }}>
                            <FormLabel sx={{ mt: 2 }} onClick={secretButtonDistress}>Pre Distress</FormLabel>
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
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <FormLabel>Peak distress</FormLabel>
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
                        </Box>
                        <Box sx={{ ml: 1 }}>
                            <FormLabel>Post Distress</FormLabel>
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
                        </Box>
                    </FormControl>

                    <TextField
                        variant="outlined"
                        multiline={true}
                        rows="4"
                        color="primary"
                        label="Notes"
                        name="notes"
                        sx={{ width: "100%", maxWidth: 600 }}
                        value={formValues.notes}
                        onChange={(event) => setFormValues({ ...formValues, notes: event.target.value })}
                    />
                </Stack>
                <br />
                {isEdit ?
                    <Stack direction="row" justifyContent="space-around">
                        <Button type="submit" sx={{ fontSize: 17 }}>SAVE</Button>
                        <Button sx={{ fontSize: 17 }} onClick={() => { history.push('/history') }}>CANCEL</Button>
                        <Button sx={{ fontSize: 17 }} onClick={() => deleteExposure(form.id)}>DELETE</Button>
                    </Stack>
                    :
                    <Stack direction="row" spacing={3}>
                        <Button type="submit" sx={{ fontSize: 17 }}>SAVE</Button>
                        <Button sx={{ fontSize: 17 }} onClick={() => { history.push('/hierarchy') }}>CANCEL</Button>
                    </Stack>
                }
            </form>
        </Box>
    )
}


export default ExposureForm;