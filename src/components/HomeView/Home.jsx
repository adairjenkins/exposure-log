import { useDispatch, useSelector } from 'react-redux'
import { useEffect, PureComponent, useState } from 'react';
import { Typography, Container, Card, Box, FormHelperText, Stack, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
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
        dispatch({ type: 'GET_PROGRESSION' });
        dispatch({ type: 'GET_HIERARCHY' });
        dispatch({ type: 'GET_EXPOSURE' });
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

    //holds id of selected hierarchy situation, default value is most recent exposure
    const [graphId, setGraphId] = useState(exposureList[0] ? exposureList[0].hierarchy_id : '');
    console.log('graphId:', graphId)
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
        // defaultSeries: {
        //     /*Gaps between cone section.*/
        //     shape_innerPadding: 6,
        //     defaultPoint: {
        //         label: {
        //             // text:
        //             //     `name goes here`,
        //             placement: 'inside',
        //             color: '0000'
        //         }
        //     }
        // },
        series: [
            {
                name: 'Hierarchy',
                palette: 'default',
                shape_innerPadding: 6,
                points: [
                    { label: { text: 'remaining' }, name: 'remaining', y: (10 - progression) / 10 },
                    { label: { text: 'completed', font: { size: 20 } }, name: 'completed', y: progression / 10 },
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
        aspectRatio: 1.1,
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
                display: false
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
                //calculates gradation between two colors
                borderColor: `rgba( ${((218 - 36) * (i / (graphExposures.length - 1)) + 36)}, 
                                    ${((62 - 126) * (i / (graphExposures.length - 1)) + 126)},
                                    ${((82 - 191) * (i / (graphExposures.length - 1)) + 191)},   
                                1)`,
                backgroundColor: 'rgba(255, 99, 132, 0)',
                borderWidth: 4
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
        <Container sx={{ marginBottom: 10 }}>
            <Stack alignItems="center" spacing={3}>
                <Stack spacing={6} justifyContent="center" direction="row" sx={{ marginTop: 4, mb: 4 }}>
                    <Box sx={{ width: 2 / 5, maxWidth: 200 }}>
                        <Typography variant="h5" align="center" sx={{ mb: 1 }}>
                            Daily Goal
                        </Typography>
                        <ProgressCircle
                            percentage={dailyPercentage}
                            count={count.daily}
                            goal={goal.daily}
                        />
                    </Box>
                    <Box sx={{ width: 2 / 5, maxWidth: 200 }}>
                        <Typography variant="h5" align="center" sx={{ mb: 1 }}>
                            Weekly Goal
                        </Typography>
                        <ProgressCircle
                            percentage={weeklyPercentage}
                            count={count.weekly}
                            goal={goal.weekly}
                        />
                    </Box>
                </Stack>
                {/* <Box sx={{ width: '90%', maxWidth: 500, marginLeft: 2, marginTop: 5 }}>
                <Typography variant="h6">
                    Hierarchy Progression
                </Typography>
                <div style={pyramidStyle}><JSCharting options={pyramidConfig} /></div>
            </Box> */}
                <Typography variant="h5" align="center">
                    Exposure Distress Levels
                </Typography>
                <FormControl sx={{ width: "100%", maxWidth: 500 }}>
                    <InputLabel>Situation</InputLabel>
                    <Select
                        value={graphId}
                        label="Situation"
                        defaultValue={exposureList[0] ? exposureList[0].hierarchy_id : ''}
                        onChange={(event) => setGraphId(event.target.value)}
                    >
                        {hierarchyList.map(situation => (
                            <MenuItem key={situation.id} value={situation.id}>{situation.rating}. {situation.description}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ width:"100%", maxWidth:500 }}>
                    <Line options={options} data={data} />
                </Box>
            </Stack>
        </Container >
    )
}

export default Home;