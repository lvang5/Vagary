const locationReducer = (state = [], action) => {
    switch(action.type){
        case 'FIND_LOCATION':
        return action.payload;
    default:
        return state;
    }
}

export default locationReducer;