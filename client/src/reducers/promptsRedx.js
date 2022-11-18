const reducer = (prompts = [], action) => {
    switch(action.type) {
        case 'FETCH_PROMPTS':
            return action.payload;
        default:
            return prompts;
    }
}

export default reducer;