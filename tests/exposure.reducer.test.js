import exposureReducer from '/src/redux/reducers/exposure.reducer';

describe('Testing exposureReducer', () => {
    test('should have correct initial state', () => {
        let action = {};
        let returnedState = exposureReducer(undefined, action);
        expect(returnedState).toEqual([])
    })
})