import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Stack, TableCell, Table, TableHead, TableRow, TableBody, Grid, Paper, Typography, Box, TextField, FormControl, MenuItem, Select, InputLabel, TableContainer } from '@mui/material';
import { Add, DeleteOutlined, EditOutlined, MoreHoriz } from '@mui/icons-material';
import Situation from './Situation';
import EditSituation from './EditSituation';

function HierarchyList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const hierarchyList = useSelector(store => store.hierarchy);
    console.log('hierarchyList from store:', hierarchyList);
    const exposureList = useSelector(store => store.exposure);
    console.log('exposureList:', exposureList);

    useEffect(() => {
        dispatch({ type: 'GET_HIERARCHY' });
        dispatch({ type: 'GET_EXPOSURE' });
    }, []);

    return (
        <>
            <Stack spacing={1.5} sx={{ width: "90%", marginBottom: "70px", marginTop: "20px", marginLeft: 2 }}>
                {hierarchyList.map(situation => (
                    exposureList.some(exposure => exposure.hierarchy_id == situation.id) ?
                        <>
                            <Paper variant="outlined" key={situation.id} sx={{ backgroundColor:"#E6EDF5",
                                '&:hover': {
                                    backgroundColor: "#ededed",
                                }, padding: 1
                            }}>
                                {/* main view */}
                                < Situation
                                    situation={situation}
                                />
                                {/* < EditSituation
                            situation={situation} 
                        /> */}
                            </Paper>
                        </>
                        :
                        <>
                            <Paper variant="outlined" key={situation.id} sx={{
                                '&:hover': {
                                    backgroundColor: "#ededed",
                                }, padding: 1
                            }}>
                                {/* main view */}
                                < Situation
                                    situation={situation}
                                />
                                {/* < EditSituation
                            situation={situation} 
                        /> */}
                            </Paper>
                        </>
                ))}
            </Stack>
            {/* <TableContainer component={Paper}>
                <Table sx={{}} >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">SITUATION</TableCell>
                            <TableCell align="left">RATING</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {hierarchyList.map(situation => (
                        <TableRow key={situation.id}>
                            <TableCell align="left">{situation.description}</TableCell>
                            <TableCell>{situation.rating}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </>
    )
}

export default HierarchyList;