const addCarReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_CAR':
        return action.payload;
    default:
        return state;
    }
}

export default addCarReducer;