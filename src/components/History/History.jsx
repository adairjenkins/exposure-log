import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Stack, Card, CardContent, Paper, Typography, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import moment from 'moment';

function History() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'GET_EXPOSURE' })
    }, []);

    const exposureList = useSelector(store => store.exposure);
    console.log('exposureList from store:', exposureList);

    const deleteExposure = (id) => {
        console.log('deleteExposure id:', id);
        dispatch({ type: 'DELETE_EXPOSURE', payload: id });
    }

    return (

        <Stack spacing={1.5} sx={{width:"90%", marginBottom:"70px", marginTop:"20px", marginLeft:2}}>
            {exposureList.map(exposure => (
                <Paper key={exposure.id} variant="outlined">

                        <Typography sx={{ fontSize: 13 }}>
                            {moment(exposure.date.substr(0,11) + exposure.time).format('lll')}
                        </Typography>
                        <Typography sx={{ fontSize: 20, mr: 10 }}>
                            {exposure.description}
                        </Typography>
                        <Typography display="inline" sx={{ mr: 10 }}>
                            RATING: {exposure.rating}
                        </Typography>
                        <Typography display="inline" sx={{ mr: 5 }}>
                            pre: {exposure.pre_suds}
                        </Typography>
                        <Typography display="inline" sx={{ mr: 5 }}>
                            peak: {exposure.peak_suds}
                        </Typography>
                        <Typography display="inline" sx={{ mr: 5 }}>
                            post: {exposure.post_suds}
                        </Typography>


                    <IconButton onClick={() => history.push(`/exposure-edit/${exposure.id}`)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteExposure(exposure.id)}>
                        <Delete />
                    </IconButton>
                </Paper>
            ))}
        </Stack>
    )
}

export default History;