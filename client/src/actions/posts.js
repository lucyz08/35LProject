import * as api from '../api';

export const getPosts = () =>async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();

        dispatch({type: 'FETCH_SONGS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createSongPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        console.log(data);
        dispatch({type: 'CREATESONG', payload: data});

    } catch (error) {
        console.log(error);
    }
}