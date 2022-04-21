import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Stack, Grid, Paper, Typography, Box } from '@mui/material';
import { Add, DeleteOutlined, EditOutlined} from '@mui/icons-material';

function HierarchyList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isEditing, setEditing] = useState(false);
    
    useEffect(() => {
        dispatch({type: 'GET_HIERARCHY'})
    }, []);

    const hierarchyList = useSelector(store => store.hierarchy);
    console.log('hierarchyList from store:', hierarchyList);

    // TODO: do I need a dispatch here?
    const logNewExposure = (situation) => {
        console.log('logNewExposure situation:', situation.description)

        history.push(`/exposure-form/${situation.id}`);
    }

    // TODO: complete put request
    const editSituation = (situation) => {
        console.log('editSituation', situation);
        dispatch({type: 'SET_EDIT', payload: situation})
        history.push(`/edit/hierarchy/${situation.id}`);
    }

    // FIXME: fix delete request - doesn't work if there's any associated exposures
    const deleteSituation = (id) => {
        console.log('deleteSituation id:', id);
        dispatch({type: 'DELETE_HIERARCHY', payload: id});
    }

    return (
        <Stack spacing={2} sx={{width:"70%", marginBottom:"70px"}}>
            {hierarchyList.map(situation => (
                    <Paper key={situation.id} sx={{
                        '&:hover': {
                          backgroundColor: "#ededed",
                        }, 
                      }}>
                        <Box onClick={() => logNewExposure(situation)}
                                                                
                        >
                            <Typography >
                                {situation.description}
                            </Typography>
                            <Typography>
                                rating: {situation.rating}
                            </Typography>
                        </Box>
                        <DeleteOutlined onClick={() => deleteSituation(situation.id)}/>
                        <EditOutlined onClick={() => editSituation(situation)}/>
                    </Paper>
            ))}
        </Stack>

    )
}

export default HierarchyList;