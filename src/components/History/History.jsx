import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Stack, Card, CardContent, Paper, Typography, IconButton, Box } from '@mui/material';
import { Add, Delete, Edit, MoreHoriz } from '@mui/icons-material';
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
        <Stack alignItems="center">
        <Stack spacing={1.5} sx={{ width:"90%", maxWidth:600, marginBottom: "70px", marginTop: "20px"}}>
            {exposureList.map(exposure => (
                <Paper key={exposure.id} variant="outlined" sx={{padding:1}}>
                    <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight:500}}>
                        RATING: {exposure.rating}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }}>
                        {moment(exposure.date.substr(0, 11) + exposure.time).format('lll')}
                    </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18, mt:.5}}>
                        {exposure.description}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" justifyContent="space-between" sx={{ width: "60%", mt:1}}>
                            <Typography display="inline" sx={{ fontWeight:500}}>
                                pre: {exposure.pre_suds}
                            </Typography>
                            <Typography display="inline" sx={{ fontWeight:500}}>
                                peak: {exposure.peak_suds}
                            </Typography>
                            <Typography display="inline" sx={{ fontWeight:500}}>
                                post: {exposure.post_suds}
                            </Typography>
                        </Stack>
                        <IconButton onClick={() => history.push(`/exposure-edit/${exposure.id}`)}>
                            <MoreHoriz/>
                        </IconButton>
                        {/* <Box>
                            <IconButton onClick={() => history.push(`/exposure-edit/${exposure.id}`)}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => deleteExposure(exposure.id)}>
                                <Delete />
                            </IconButton>
                        </Box> */}
                    </Stack>
                </Paper>
            ))}
        </Stack>
        </Stack>
    )
}

export default History;