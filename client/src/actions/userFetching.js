import * as api from '../api/APIindex';

export const getAuthCheck = (post) =>async (dispatch) => {
    try {
        const {data: res} = await api.fetchAuth(post);
        localStorage.setItem("token", res.data);
        window.location = '/'
    } catch (error) {
        console.log(error.message);
    }
}

export const createUserProfile = (post) => async (dispatch) => {
    try {
        await api.createUser(post);
    } catch (error) {
        console.log(error);
    }
}
