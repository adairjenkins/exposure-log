import { useDispatch, useSelector } from 'react-redux'
import { useEffect, PureComponent } from 'react';
import { Typography, Card, Box, Stack } from '@mui/material';
import { Star } from '@mui/icons-material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { JSCharting } from 'jscharting-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_GOAL' });
        dispatch({ type: 'GET_COUNT' });
        dispatch({ type: 'GET_AVERAGE' });
        dispatch({ type: 'GET_PROGRESSION' })
    }, []);

    const goal = useSelector(store => store.goal);
    console.log('goal:', goal);
    const count = useSelector(store => store.count);
    console.log('count:', count);
    const average = useSelector(store => store.average);
    console.log('average:', average);
    const progression = useSelector(store => store.progression).max;
    console.log('progression:', progression);

    let dailyPercentage = 100 * (count.daily / goal.daily);
    let weeklyPercentage = 100 * (count.weekly / goal.weekly);

    const pyramidConfig = {
        type: 'cone',
        legend_visible: false,
        defaultSeries: {
            /*Gaps between cone section.*/
            shape_innerPadding: 6,
            defaultPoint: {
                label: {
                    // text:
                    //     `name goes here`,
                    placement: 'inside',
                    color: '0000'
                }
            }
        },
        series: [
            {
                name: 'Costs',
                palette: 'default',
                points: [
                    { label: {text:'remaining'}, name: 'remaining', y: (10 - progression) / 10 },
                    { label: {text:'completed', font: {size: 15}}, name: 'completed', y: progression / 10 },
                ]
            }
        ]
    };

    const pyramidStyle = {

        height: '400px',
        margin: '0px auto'

    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        aspectRatio: 1,
        tension: .4,
        scales: {
            y: {
                position: 'bottom',
                stackWeight: 1,
                grid: {
                    display: false
                },
                min:0,
                max:100,
                title: {
                    display: true,
                    text: 'Subjective Units of Distress',
                    font: {
                        size: 16,
                        family: "Roboto"
                    }
                }
            },
            x: {
                position: 'bottom',
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Exposure',
                    font: {
                        size: 16,
                        family: "Roboto"
                    }
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
        },
    };


    const labels = ['Pre', 'Peak', 'Post'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Average',
                data: [Math.round(average.pre), Math.round(average.peak), Math.round(average.post)],
                borderColor: 'primary',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 6
            },
        ],
    };



    return (
        <Box sx={{ marginBottom: 10 }}>
            <Stack spacing={4} direction="row">
                <Box sx={{ width: 2 / 5, maxWidth: 200}}>
                    <Typography variant="h6">
                        Daily Goal
                    </Typography>
                    <CircularProgressbar
                        value={dailyPercentage}
                        text={dailyPercentage == 100 ? <></>
                            : `${count.daily} of ${goal.daily}`}
                        strokeWidth={10}
                        styles={buildStyles({
                            pathColor: `rgba(62, 152, 199)`,
                            textColor: '#FF5733',
                            backgroundColor: '#FF5733'
                        })}
                    />
                </Box>
                <Box sx={{ width: 2 / 5, maxWidth:200 }}>
                    <Typography variant="h6">
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
            <Box sx={{width:'90%', maxWidth:500}}>
                <Typography variant="h6">
                    Hierarchy Progression
                </Typography>
                <div style={pyramidStyle}><JSCharting options={pyramidConfig} /></div>
            </Box>
            <Box sx={{width:'90%', maxWidth:500, marginBottom:10, marginLeft: 2}}>
                <Typography variant="h6">
                    Average Pre, Peak, and Post Exposure Distress Levels  
                </Typography>
                <Line options={options} data={data} />
            </Box>
        </Box>
    )
}

export default Home;