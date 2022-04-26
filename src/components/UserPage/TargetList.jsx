import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';

function TargetList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_TARGET' })
    }, []);

    const targetList = useSelector(store => store.target);
    console.log('targetList:', targetList);

    return (
        <Box>
            <Typography variant="h5">Target Fears</Typography>
            <Grid container spacing={2}>
                {targetList.map(target => (
                    <Grid item key={target.id}>
                        <Card sx={{ minWidth: 170, minHeight: 170 }}>
                            {target.fear}
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Box>
    )
}

export default TargetList;