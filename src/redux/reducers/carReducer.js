const carReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_CAR':
        return action.payload;
    default:
        return state;
    }
}

export default carReducer;