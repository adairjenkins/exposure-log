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
        <Grid container spacing={2}>
            {exposureList.map(exposure => (
                <Grid item key={exposure.id} xs={12}>
                    <Paper>
                        <Typography>
                            {exposure.description}
                        </Typography>
                        <Typography>
                            rating: {exposure.rating}
                        </Typography>
                        <Typography>
                            date: {exposure.date}
                        </Typography>
                        <Typography>
                            pre: {exposure.pre_suds}
                        </Typography>
                        <Typography>
                            peak: {exposure.peak_suds}
                        </Typography>
                        <Typography>
                            post: {exposure.post_suds}
                        </Typography>
                    </Paper>
                </Grid>  
            ))}
        </Grid>
        </>
    )
}

export default History;