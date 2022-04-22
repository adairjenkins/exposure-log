import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Stack, Grid, Paper, Typography, Box, TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { Add, DeleteOutlined, EditOutlined} from '@mui/icons-material';
import Situation from './Situation';
import EditSituation from './EditSituation';

function HierarchyList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const hierarchyList = useSelector(store => store.hierarchy);
    console.log('hierarchyList from store:', hierarchyList);

    useEffect(() => {
        dispatch({type: 'GET_HIERARCHY'})
    }, []);

    // // TODO: do I need a dispatch here?  MOVED TO SITUATION
    // const logNewExposure = (situation) => {
    //     console.log('logNewExposure situation:', situation.description)

    //     history.push(`/exposure-form/${situation.id}`);
    // }

    const editSituation = (situation) => {
        console.log('editSituation', situation);

    }

    return (
        <Stack spacing={2} sx={{width:"70%", marginBottom:"70px", marginTop:"20px" }}>
            {hierarchyList.map(situation => (
                    <Paper variant="outlined" key={situation.id} sx={{
                        '&:hover': {
                          backgroundColor: "#ededed",
                        }, 
                      }}>
                        {/* main view */}
                        < Situation
                            situation={situation}
                        />
                        < EditSituation
                            situation={situation} 
                        />
                    </Paper>
            ))}
        </Stack>

    )
}

export default HierarchyList;