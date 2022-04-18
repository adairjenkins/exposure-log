import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ExposureForm () {
    const dispatch = useDispatch();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');
    const [preSuds, setPreSuds] = useState('');
    const [peakSuds, setPeakSuds] = useState('');
    const [postSuds, setPostSuds] = useState('');
    const [notes, setNotes] = useState('');

    const hierarchyList = useSelector(store  => store.hierarchy);
    console.log('hierarchyList from store', hierarchyList);

    useEffect(() => {
        dispatch({type: 'GET_HIERARCHY'})
    }, []);  

    const submitForm = (event) => {
        event.preventDefault();
        console.log('submitForm func');
    }
    
    return (
        <form onSubmit={submitForm}>
            <select name="situation">
                {hierarchyList.map(situation => (
                    <option key={situation.id} value={situation.id}>{situation.description}</option>
                ))}
            </select>
            <button type="submit">LOG</button>
        </form>
    )
}

export default ExposureForm;