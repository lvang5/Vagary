const carReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_CAR':
        return [...state, action.payload];
    default:
        return state;
    }
}

export default carReducer;