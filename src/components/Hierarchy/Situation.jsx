import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Stack, Grid, Paper, IconButton, Typography, Box, TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { Add, DeleteOutlined, Edit, Delete, EditOutlined} from '@mui/icons-material';

function Situation({situation}) {
    const history = useHistory();
    const dispatch = useDispatch();
    
    // TODO: do I need a dispatch here?
    const logNewExposure = (situation) => {
        console.log('logNewExposure situation:', situation.description)
        history.push(`/exposure-form/${situation.id}`);
    }

    const editSituation = (situation) => {
        console.log('edit situation:', situation);
    }

    // FIXME: fix delete request - doesn't work if there's any associated exposures
    const deleteSituation = (id) => {
        console.log('deleteSituation id:', id);
        dispatch({type: 'DELETE_HIERARCHY', payload: id});
    }

    return (
        <>
            <Box onClick={() => logNewExposure(situation)}>
                <Typography >
                    {situation.description}
                </Typography>
                <Typography>
                    rating: {situation.rating}
                </Typography>
            </Box>
            <IconButton onClick={() => deleteSituation(situation.id)}>
                    <Delete/>
                </IconButton>
                <IconButton onClick={() => editSituation(situation)}>
                    <Edit/>
            </IconButton>
        </>

    )
}

export default Situation;