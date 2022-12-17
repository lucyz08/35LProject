const reducer = (prompts = [], action) => {
    switch(action.type) {
        case 'FETCH_PROMPTS':
            localStorage.setItem('currentPrompt', JSON.stringify({ ...action?.payload}))
            return action.payload;
        case 'CREATEPROMPT':
            return [...prompts, action.payload];
        case 'PROMPT_RESPONSES':
            localStorage.setItem('promptResponses', JSON.stringify({ ...action?.payload}))
            return action.payload;
        case 'ADD_CUSTOM_RESPONSES':
            localStorage.setItem('customresponses', JSON.stringify({ ...action?.payload}))
            return action.payload;
        default:
            return prompts;
    }
}

export default reducer;