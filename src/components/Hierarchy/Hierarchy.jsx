import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HierarchyForm from './HierarchyForm';
import HierarchyList from './HierarchyList';

function Hierarchy () {
    // TODO: figure out how to carry over current target
    const target = useParams().id
    console.log('target:', target);
    
    return (
        <>
            <h3>{target} Hierarchy</h3>
            <HierarchyForm/>
            <HierarchyList/>
        </>
    )
}

export default Hierarchy;