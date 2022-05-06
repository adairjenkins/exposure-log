import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HierarchyForm from './HierarchyForm';
import HierarchyList from './HierarchyList';
import { Box, Container, Stack } from '@mui/material';

function Hierarchy() {
    // TODO: figure out how to carry over current target
    const target = useParams().id
    console.log('target:', target);

    return (
        <>
                <HierarchyForm />

                <HierarchyList />

        </>
    )
}

export default Hierarchy;