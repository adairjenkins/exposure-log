import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function History() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: 'GET_EXPOSURE'})
    }, []);    

    const exposureList = useSelector(store => store.exposure);
    console.log('exposureList from store:', exposureList);
    
    return (
        <p>History Component</p>
    )
}

export default History;