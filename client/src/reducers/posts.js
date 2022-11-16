const reducer = (posts = [], action) => {
    switch(action.type) {
        case 'FETCH_SONGS':
            return action.payload;
        case 'CREATESONG':
            return [...posts, action.payload];
        default:
            return posts;
    }
};

export default reducer;