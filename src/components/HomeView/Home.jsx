import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Typography, Card } from '@mui/material';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_GOAL' });
        dispatch({ type: 'GET_COUNT' });
        dispatch({ type: 'GET_AVERAGE' });
    }, []);

    const goal = useSelector(store => store.goal);
    console.log('goal:', goal);
    const count = useSelector(store => store.count);
    console.log('count:', count);
    const average = useSelector(store => store.average);
    console.log('average:', average);

    return(
        <>
        <Typography color="red">
        HOME
        • daily & weekly goal progress
        • triangle graph with progression in hierarchy
        • graph with average pre, peak, and post SUDS
        </Typography>
        <Card>

        </Card>
        </>
    )
}

export default Home;