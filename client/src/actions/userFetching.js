import * as api from '../api/APIindex';

export const signin = (post) =>async (dispatch) => {
    try {
        const {data} = await api.signIn(post);
        dispatch({type: 'AUTH', payload: data});
        window.location.reload();
    } catch (error) {
        console.log(error.message);
    }
}

export const signup = (post) => async (dispatch) => {
    try {
        const {data} = await api.signUp(post);
        dispatch({type: 'AUTH', payload: data});
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}
