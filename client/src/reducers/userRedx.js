

const userReducer = (state = {curUsr: null}, action) => {
    switch(action.type) {
        case 'FRIEND':
            localStorage.setItem('userdata', JSON.stringify({...action?.payload}))
            return {...state, curUsr: action?.payload}
        default:
            return state;
    }
}

export default userReducer;