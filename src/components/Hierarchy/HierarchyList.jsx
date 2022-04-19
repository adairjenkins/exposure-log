import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';

function HierarchyList() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch({type: 'GET_HIERARCHY'})
    }, []);

    const hierarchyList = useSelector(store => store.hierarchy);
    console.log('hierarchyList from store:', hierarchyList);

    const logNewExposure = (situation) => {
        console.log('logNewExposure situation:', situation.description)

        history.push(`/exposure-form/${situation.id}`);
    }

    return (
        <Grid container spacing={1}>
            {hierarchyList.map(situation => (
                <Grid item xs={12} key={situation.id}>
                    <Paper onClick={() => logNewExposure(situation)}>
                        <Typography>
                            {situation.description}
                        </Typography>
                        <Typography>
                            rating: {situation.rating}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>

    )
}

export default HierarchyList;