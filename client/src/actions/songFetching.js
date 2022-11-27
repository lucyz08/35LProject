import * as api from '../api/APIindex';

export const getSongs = () =>async (dispatch) => {
    try {
        const {data} = await api.fetchSongs();

        dispatch({type: 'FETCH_SONGS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const getFriendSongs = (post) =>async (dispatch) => {
    try {
        console.log(post)
        const {data} = await api.fetchFriendSongs(post);

        dispatch({type: 'FETCH_FRIEND_SONGS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createSongPost = (post) => async (dispatch) => {
    try {
        console.log(post)
        const {data} = await api.createSong(post);
        dispatch({type: 'CREATESONG', payload: data});

    } catch (error) {
        console.log(error);
    }
}