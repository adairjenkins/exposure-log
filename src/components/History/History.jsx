import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Stack, Card, CardContent, Paper, Typography, IconButton } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

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
        dispatch({type: 'DELETE_EXPOSURE', payload: id});
    }

    return (
        <>
            <h3>HISTORY</h3>
            <Stack spacing={2}>
                {exposureList.map(exposure => (
                    <Card key={exposure.id}>
                        <CardContent>
                            <Typography sx={{ fontSize: 13 }}>
                                DATE: {exposure.date}
                            </Typography>
                            <Typography sx={{ fontSize: 20, mr:10 }}>
                                {exposure.description}
                            </Typography>
                            <Typography display="inline" sx={{ mr:10 }}>
                                RATING: {exposure.rating}
                            </Typography>
                            <Typography display="inline" sx={{ mr:5 }}>
                            pre: {exposure.pre_suds}
                            </Typography>
                            <Typography display="inline" sx={{ mr:5 }}>
                                peak: {exposure.peak_suds}
                            </Typography>
                            <Typography display="inline" sx={{ mr:5 }}>
                                post: {exposure.post_suds}
                            </Typography>
                        </CardContent>

                        <IconButton onClick={() => history.push(`/exposure-edit/${exposure.id}`)}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => deleteExposure(exposure.id)}>
                            <Delete />
                        </IconButton>
                    </Card>
                ))}
            </Stack>
        </>
    )
}

export default History;