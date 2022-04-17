const exposureReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_EXPOSURE':
            return action.payload;
        default: 
            return state;
    }
}

export default exposureReducer;