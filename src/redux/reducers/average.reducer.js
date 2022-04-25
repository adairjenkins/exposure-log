const averageReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_AVERAGE':
            return action.payload;
        default: 
            return state;
    }
}

export default averageReducer;