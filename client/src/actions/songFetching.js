import * as api from '../api/APIindex';

export const getSongs = () =>async (dispatch) => {
    try {
        const {data} = await api.fetchSongs();

        dispatch({type: 'FETCH_SONGS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createSongPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createSong(post);
        console.log(data)
        dispatch({type: 'CREATESONG', payload: data});
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}