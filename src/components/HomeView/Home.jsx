import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Typography, Card, Box, Stack } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
    const progression = useSelector(store => store.progression);

    let dailyPercentage = 100 * (count.daily / goal.daily);
    let weeklyPercentage = 100 * (count.weekly / goal.weekly);

    return (
        <>
            <Typography color="red">
                HOME
                • daily & weekly goal progress
                • triangle graph with progression in hierarchy
                • graph with average pre, peak, and post SUDS
            </Typography>
            <Card>

            </Card>
            <Stack spacing={4} direction="row">
            <Box sx={{ width: 2/5 }}>
                <Typography>
                    Daily Goal
                </Typography>
                <CircularProgressbar
                    value={dailyPercentage}
                    text={`${count.daily} of ${goal.daily}`} 
                    strokeWidth={10}
                    styles={buildStyles({
                        pathColor: `rgba(62, 152, 199)`,
                        textColor: '#FF5733',
                        backgroundColor: '#FF5733'
                    })}
                />
            </Box>
            <Box sx={{ width: 2/5 }}>
            <Typography>
                    Weekly Goal
                </Typography>
                <CircularProgressbar
                    value={weeklyPercentage}
                    text={`${count.weekly} of ${goal.weekly}`} 
                    strokeWidth={10}
                    styles={buildStyles({
                        pathColor: `rgba(62, 152, 199)`,
                        textColor: '#FF5733',
                        backgroundColor: '#FF5733',
                        strokeLinecap: 'butt',
                        textSize: '14px',
                    })}
                />
            </Box>
            </Stack>
        </>
    )
}

export default Home;