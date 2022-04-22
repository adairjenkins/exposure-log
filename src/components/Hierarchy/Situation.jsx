import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Stack, Grid, Paper, IconButton, Typography, Box, TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { Add, Check, Close, DeleteOutlined, Edit, Delete, EditOutlined} from '@mui/icons-material';

function Situation({situation}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isEditing, setEditing] = useState(false);
    
    // TODO: do I need a dispatch here?
    const logNewExposure = (situation) => {
        console.log('logNewExposure situation:', situation.description)
        history.push(`/exposure-form/${situation.id}`);
    }

    const editSituation = (situation) => {
        setEditing(true);
        console.log('edit situation:', isEditing, situation);
    }

    // FIXME: fix delete request - doesn't work if there's any associated exposures (potentially change those hierarchy_id values to NULL/0)
    const deleteSituation = (id) => {
        console.log('deleteSituation id:', id);
        dispatch({type: 'DELETE_HIERARCHY', payload: id});
    }

    return (
        <>
        {isEditing ?  
            <Box>
                editMe!
                <IconButton>
                    <Check/>
                </IconButton>
                <IconButton>
                    <Close/>
                </IconButton>
            </Box> 
                
            : 
            <>
                <Box onClick={() => logNewExposure(situation)}>
                    <Typography >
                        {situation.description}
                    </Typography>
                    <Typography>
                        rating: {situation.rating}
                    </Typography>
                </Box>
            
                <IconButton onClick={() => editSituation(situation)}>
                    <Edit/>
                </IconButton>
                <IconButton onClick={() => deleteSituation(situation.id)}>
                    <Delete/>
                </IconButton>
            </>
        }
        
        </>
    )
}

export default Situation;