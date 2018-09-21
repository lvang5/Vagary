const tripReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_DATA':
        return [...state, action.payload];
    default:
        return state;
    }
}

export default tripReducer;