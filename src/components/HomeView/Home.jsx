import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Typography } from '@mui/material';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_GOAL' })
    }, []);

    const goals = useSelector(store => store.goal);
    console.log('goals:', goals);

    return(
        <>
        <Typography color="red">
        <p>HOME</p>
        <p>• daily & weekly goal progress</p>
        <p>• triangle graph with progression in hierarchy</p>
        <p>• graph with average pre, peak, and post SUDS</p>
        </Typography>
        </>
    )
}

export default Home;