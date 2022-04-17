const targetReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_TARGET':
            return action.payload;
        default:
            return state;
    }
}

export default targetReducer;