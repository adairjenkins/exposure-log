import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Stack, Grid, Paper, IconButton, Typography, Box, TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { Check, Close, Edit, DeleteOutline, MoreHoriz } from '@mui/icons-material';

function Situation({ situation }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isEditing, setEditing] = useState(false);
    const [editValues, setEditValues] = useState(situation);

    // TODO: do I need a dispatch here?
    const logNewExposure = (situation) => {
        console.log('logNewExposure situation:', situation.description)
        history.push(`/exposure-form/${situation.id}`);
    }

    const commitEdit = (event) => {
        event.preventDefault();
        console.log('editValues:', editValues)
        dispatch({ type: 'EDIT_HIERARCHY', payload: editValues })
        setEditing(false);
    }

    // FIXME: fix delete request - doesn't work if there's any associated exposures (potentially change those hierarchy_id values to NULL/0)
    const deleteSituation = (id) => {
        console.log('deleteSituation id:', id);
        dispatch({ type: 'DELETE_HIERARCHY', payload: id });
    }

    return (
        <>
            {isEditing ?
                <Box>
                    <TextField
                        sx={{ width: 270 }}
                        value={editValues.description}
                        onChange={(event) => setEditValues({ ...editValues, description: event.target.value })}
                    />
                    <FormControl required>
                        <Select
                            value={editValues.rating}
                            onChange={(event) => setEditValues({ ...editValues, rating: event.target.value })}
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
                    <Stack direction="row" justifyContent="space-around" sx={{width:"60%"}}>
                        <IconButton onClick={commitEdit}>
                            <Check />
                        </IconButton>
                        <IconButton onClick={() => setEditing(false)}>
                            <Close />
                        </IconButton>
                        <IconButton onClick={() => deleteSituation(situation.id)}>
                            <DeleteOutline />
                        </IconButton>
                    </Stack>
                </Box>

                :
                <>
                    <Box onClick={() => logNewExposure(situation)}>
                        <Typography sx={{ fontSize: 18 }}>
                            {situation.description}
                        </Typography>
                    </Box>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 14, fontWeight:500 }}>
                            RATING: {situation.rating}
                        </Typography>
                        <IconButton onClick={() => setEditing(true)}>
                            <MoreHoriz />
                        </IconButton>
                    </Stack>
                </>
            }

        </>
    )
}

export default Situation;