const editReducer = (state = {}, action) => {
    if(action.type == 'SET_EDIT') {
        return action.payload;
    } else if (action.type == 'EDIT_ONCHANGE') {
        return {
            //keep old unchanged data...
            ...state,
            //update the property sent with the value sent
           [action.payload.property] : action.payload.value
        }
    }
    return state;
}

export default editReducer;