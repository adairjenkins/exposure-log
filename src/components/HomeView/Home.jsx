import { useDispatch, useSelector } from 'react-redux'
import { useEffect, PureComponent } from 'react';
import { Typography, Card, Box, Stack } from '@mui/material';
import { Star } from '@mui/icons-material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { JSCharting } from 'jscharting-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_GOAL' });
        dispatch({ type: 'GET_COUNT' });
        dispatch({ type: 'GET_AVERAGE' });
        dispatch({ type: 'GET_PROGRESSION'})
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
        yAxis: {
            label_text: 'Cost',
            formatString: 'c'
        },
        defaultSeries: {
            /*Gaps between cone section.*/
            shape_innerPadding: 6,
            defaultPoint: {
                label: {
                    text:
                        `name goes here`,
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
                    { name: 'remaining', y: (10 - progression) / 10 },
                    { name: 'completed', y: progression / 10 },
                ]
            }
        ]
    };

    const pyramidStyle = {
        maxWidth: '300px',
        minWidth: '300px',
        height: '300px',
        margin: '0px auto'

    };

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

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
                <Box sx={{ width: 2 / 5 }}>
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
                <Box sx={{ width: 2 / 5 }}>
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
            <Box>
                <Typography variant="h6">
                    Hierarchy Progression
                </Typography>
                <div style={pyramidStyle}><JSCharting options={pyramidConfig} /></div>
            </Box>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>

        </>
    )
}

export default Home;