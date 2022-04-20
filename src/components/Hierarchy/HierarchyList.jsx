import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Add, DeleteOutlined, EditOutlined} from '@mui/icons-material';

function HierarchyList() {
    const dispatch = useDispatch();
    const history = useHistory();
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
        //TODO:
        // dispatch({type: 'EDIT_HIERARCHY', payload})
    }

    // TODO: complete delete request
    const deleteSituation = (id) => {
        console.log('deleteSituation id:', id);
        dispatch({type: 'DELETE_HIERARCHY', payload: id});
    }

    return (
        <Grid container spacing={1}>
            {hierarchyList.map(situation => (
                <Grid item xs={12} key={situation.id}>
                    <Paper>
                        <Box onClick={() => logNewExposure(situation)}>
                            <Typography>
                                {situation.description}
                            </Typography>
                            <Typography>
                                rating: {situation.rating}
                            </Typography>
                        </Box>
                        <DeleteOutlined onClick={() => deleteSituation(situation.id)}/>
                        <EditOutlined onClick={() => editSituation(situation)}/>
                    </Paper>
                </Grid>
            ))}
        </Grid>

    )
}

export default HierarchyList;