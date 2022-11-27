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

export const addFriend = (post) => async (dispatch) => {
    try {
        const currUsername = JSON.parse(localStorage.getItem('profile'))
        const you = currUsername.result.username
        const filter = {"username": you}

        const usrAndFriend = [post, filter]
        
        const {data} = await api.addFriend(usrAndFriend);
        dispatch({type: 'FRIEND', payload: data})
        window.location.reload();
    } catch(error) {
        console.log(error.response.data.message);
    }
}
