import * as api from '../api/APIindex';

export const getRandPrompt = () => async (dispatch) => {
    try {
        const currUsername = JSON.parse(localStorage.getItem('profile'))
        const you = currUsername.result.username
        const filter = {"user": you}

        const {data} = await api.fetchPrompts(filter);
        dispatch( {type: 'FETCH_PROMPTS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createPromptPost = (post) => async (dispatch) => {
    try {
        const currUsername = JSON.parse(localStorage.getItem('profile'))
        const you = currUsername.result.username
        const filter = {"user": you}

        const usrAndPrompt = [filter, post];
        const {data} = await api.createPrompt(usrAndPrompt);
        console.log(data);
        dispatch({type: 'CREATEPROMPT', payload: data});
        window.location.reload();

    } catch (error) {
        console.log(error);
        window.location.reload();
    }
}