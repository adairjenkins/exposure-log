const progressionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROGRESSION':
            return action.payload;
        default:
            return state;
    }
}

export default progressionReducer;