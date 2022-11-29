

const userReducer = (state = {currentUser: null}, action) => {
    switch(action.type) {
        case 'FRIEND':
            localStorage.setItem('userdata', JSON.stringify({...action?.payload}))
            return {...state, currentUser: action?.payload}
        case 'CREATE_PLAYLIST':
            return action.payload
        case 'FETCH_RESPONSES':
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;