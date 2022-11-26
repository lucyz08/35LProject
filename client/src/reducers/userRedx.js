

const userReducer = (state = {curUsr: null}, action) => {
    switch(action.type) {
        case 'FRIEND':
            //Possible that this is using only the friend to create a whole new profile here
            //may need to change
            localStorage.setItem('userdata', JSON.stringify({...action?.payload}))
            return {...state, curUsr: action?.payload}
        default:
            return state;
    }
}

export default userReducer;