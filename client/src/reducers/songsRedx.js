const reducer = (songs = [], action) => {
    switch(action.type) {
        case 'FETCH_SONGS':
            return action.payload;
        case 'CREATESONG':
            return [...songs, action.payload];
        default:
            return songs;
    }
};

export default reducer;