import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HierarchyForm from './HierarchyForm';
import HierarchyList from './HierarchyList';
import { Box, Container } from '@mui/material';

function Hierarchy() {
    // TODO: figure out how to carry over current target
    const target = useParams().id
    console.log('target:', target);

    return (
        <>
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <HierarchyForm />
            </Box >
            <Box display="flex"
                justifyContent="center"
                alignItems="center">
                <HierarchyList />
            </Box>
        </>
    )
}

export default Hierarchy;