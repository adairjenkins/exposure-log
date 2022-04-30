import { useDispatch, useSelector } from 'react-redux'
import { useEffect, PureComponent, useState } from 'react';
import { Typography, Card, Box, FormHelperText, Stack, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import { Star } from '@mui/icons-material';
import moment from 'moment';
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
import ProgressCircle from './ProgressCircle';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_GOAL' });
        dispatch({ type: 'GET_COUNT' });
        dispatch({ type: 'GET_AVERAGE' });
        dispatch({ type: 'GET_PROGRESSION' })
        dispatch({ type: 'GET_HIERARCHY' })
        dispatch({ type: 'GET_EXPOSURE' })
    }, []);

    const goal = useSelector(store => store.goal);
    console.log('goal:', goal);
    const count = useSelector(store => store.count);
    console.log('count:', count);
    const average = useSelector(store => store.average);
    console.log('average:', average);
    const progression = useSelector(store => store.progression).max;
    console.log('progression:', progression);
    const hierarchyList = useSelector(store => store.hierarchy);
    console.log('hierarchyList:', hierarchyList);
    const exposureList = useSelector(store => store.exposure);
    console.log('exposureList:', exposureList);

    //holds id of selected hierarchy situation
    const [graphId, setGraphId] = useState('');
    //filter exposureList for hierarchy_id matching selected hierarchy id
    const graphExposures = exposureList.filter(exposure => {
        return exposure.hierarchy_id == graphId
    })
    console.log('graphExposures:', graphExposures);


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
                    { label: { text: 'remaining' }, name: 'remaining', y: (10 - progression) / 10 },
                    { label: { text: 'completed', font: { size: 15 } }, name: 'completed', y: progression / 10 },
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
    // line graph options
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
                min: 0,
                max: 100,
                title: {
                    display: true,
                    text: 'Distress',
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
                display: true
            },
            title: {
                display: false,
            },
        },
    };
    // line graph horizontal labels
    const labels = ['Pre', 'Peak', 'Post'];
    // line graph data
    const data = {
        labels,
        datasets: graphExposures.map((exposure, i) => (
                        {
                            label: moment(exposure.date.substr(0, 11) + exposure.time).format('lll'),
                            data: [exposure.pre_suds, exposure.peak_suds, exposure.post_suds],
                            borderColor: `rgba(${100}, ${0}, ${255 * (i + 1)/graphExposures.length}, 1)`,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderWidth: 6
                        }
                        ))
            // {
            //     label: 'Average',
            //     data: [Math.round(average.pre), Math.round(average.peak), Math.round(average.post)],
            //     borderColor: 'rgba(255, 67, 172, 0.5)',
            //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
            //     borderWidth: 6
            // }, 
            //  {
            //     label: 'Average',
            //     data: [50, Math.round(average.peak), Math.round(average.post)],
            //     borderColor: 'primary',
            //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
            //     borderWidth: 6
            // }
        ,
    };
    console.log('line graph data.dataset', data.datasets)



    return (
        <Box sx={{ marginBottom: 10 }}>
            <Stack spacing={4} direction="row" sx={{ marginLeft: 3, marginTop: 4 }}>
                <Box sx={{ width: 2 / 5, maxWidth: 200 }}>
                    <Typography variant="h6">
                        Daily Goal
                    </Typography>
                    <ProgressCircle
                        percentage={dailyPercentage}
                        count={count.daily}
                        goal={goal.daily}
                    />
                </Box>
                <Box sx={{ width: 2 / 5, maxWidth: 200 }}>
                    <Typography variant="h6">
                        Weekly Goal
                    </Typography>
                    <ProgressCircle
                        percentage={weeklyPercentage}
                        count={count.weekly}
                        goal={goal.weekly}
                    />
                </Box>
            </Stack>
            <Box sx={{ width: '90%', maxWidth: 500, marginLeft: 2, marginTop: 5 }}>
                <Typography variant="h6">
                    Hierarchy Progression
                </Typography>
                <div style={pyramidStyle}><JSCharting options={pyramidConfig} /></div>
            </Box>
            <Box sx={{ width: '90%', maxWidth: 500, marginBottom: 10, marginLeft: 2 }}>
                <Typography variant="h6">
                    Exposure Distress Levels
                </Typography>
                <FormControl sx={{ maxWidth: 600, width: "100%" }}>
                    <InputLabel>Situation</InputLabel>
                    <Select
                        value={graphId}
                        label="Situation"
                        // defaultValue={formValues.hierarchy_id}
                        onChange={(event) => setGraphId(event.target.value)}
                    >
                        {hierarchyList.map(situation => (
                            <MenuItem key={situation.id} value={situation.id}>{situation.rating}. {situation.description}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Line options={options} data={data} />
            </Box>
        </Box >
    )
}

export default Home;