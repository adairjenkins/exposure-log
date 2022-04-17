const hierarchyReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HIERARCHY':
            return action.payload;
        default:
            return state;
    }
}

export default hierarchyReducer;