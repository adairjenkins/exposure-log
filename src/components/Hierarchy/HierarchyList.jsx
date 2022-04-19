import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@mui/material';

function HierarchyList() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'GET_HIERARCHY'})
    }, []);

    const hierarchyList = useSelector(store => store.hierarchy);
    console.log('hierarchyList from store:', hierarchyList);

    return (
        <Grid container spacing={1}>
            {hierarchyList.map(situation => (
                <Grid item xs={12}>
                    <Paper>
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