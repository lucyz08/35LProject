import * as api from '../api/APIindex';

export const getPrompts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPrompts();

        dispatch( {type: 'FETCH_PROMPTS', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}
