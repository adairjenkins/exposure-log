import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@mui/material';

function History() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'GET_EXPOSURE'})
    }, []);    

    const exposureList = useSelector(store => store.exposure);
    console.log('exposureList from store:', exposureList);
    
    return (
        <>
        <h3>HISTORY</h3>
        <Grid container>
            {exposureList.map(exposure => (
                <Grid item key={exposure.id}>
                    <Paper>
                        <Typography>
                            DATE: {exposure.date}
                        </Typography>
                    </Paper>
                </Grid>  
            ))}
        </Grid>
        </>
    )
}

export default History;