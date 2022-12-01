import * as api from '../api/APIindex';

export const signin = (post) =>async (dispatch) => {
    try {
        const {data} = await api.signIn(post);
        dispatch({type: 'AUTH', payload: data});

        const currUsername = JSON.parse(localStorage.getItem('profile'))
        const you = currUsername.result.username
        const filter = {"username": you}
        const {userData} = await api.fetchUser(filter)
        dispatch( {type:'FRIEND', payload: userData})

        window.location.reload();
        window.location.assign("http://localhost:3000/welcome");
    } catch (error) {
        console.log(error.message); 
        window.location.reload();
    }
}

export const signup = (post) => async (dispatch) => {
    try {
        const {data} = await api.signUp(post);
        dispatch({type: 'AUTH', payload: data});

        const currUsername = JSON.parse(localStorage.getItem('profile'))
        const you = currUsername.result.username
        const filter = {"username": you}
        const {userData} = await api.fetchUser(filter)
        dispatch( {type:'FRIEND', payload: userData})

        window.location.reload();
        window.location.assign("http://localhost:3000/welcome");
    } catch (error) {
        console.log(error);
        window.location.reload();
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

export const getPlaylists = () => async (dispatch) => {
    try{
        const currUser = JSON.parse(localStorage.getItem('userdata'))
        const playlists = []
        playlists.push(currUser.playlist1)
        playlists.push(currUser.playlist2)
        playlists.push(currUser.playlist3)
        playlists.push(currUser.playlist4)
        playlists.push(currUser.playlist5)
        console.log(playlists)
    } catch (error) {
        console.log(error)
    }
}

export const setUserData = () => async (dispatch) => {
    try {
        const currUsername = JSON.parse(localStorage.getItem('profile'))
        const you = currUsername.result.username
        const filter = {"username": you}
        const {data} = await api.fetchUser(filter)
        dispatch( {type:'FRIEND', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const newPlaylist = () => async (dispatch) => {
    try {
        const currUsername = JSON.parse(localStorage.getItem('profile'))
        const you = currUsername.result.username
        const filter = {"username": you}
        const {data} = await api.createPlaylist(filter);
        dispatch( {type:'CREATE_PLAYLIST', payload: data})
    } catch (error) {
        console.log(error.response.data.message)
    }
}

export const compileResponses = () => async (dispatch) => {
    try {
        const {data} = await api.fetchResponses();
        dispatch( {type: 'FETCH_RESPONSES', payload: data})
    } catch (error) {
        console.log(error.response.data.message)
    }
}