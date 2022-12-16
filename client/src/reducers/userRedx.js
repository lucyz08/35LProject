const userReducer = (state = {currentUser: null}, action) => {
    switch(action.type) {
        case 'FRIEND':
            localStorage.setItem('userdata', JSON.stringify({...action?.payload}))
            return {...state, currentUser: action?.payload}
        case 'CREATE_PLAYLIST':
            return action.payload
        case 'FETCH_RESPONSES':
            localStorage.setItem('userresponse', JSON.stringify({...action?.payload}))
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;