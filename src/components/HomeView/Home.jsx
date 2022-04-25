import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Typography, Card } from '@mui/material';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_GOAL' })
    }, []);

    const goals = useSelector(store => store.goal);
    console.log('goals:', goals);
    // const weeklyCount = useSelector(store => store.) 

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