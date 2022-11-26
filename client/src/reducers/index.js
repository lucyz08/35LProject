import { combineReducers } from "redux";

import songs from './songsRedx';
import prompts from './promptsRedx';
import auth from  './authRedx';

export const reducers = combineReducers({
    songs: songs,
    prompts: prompts,
    auth: auth,
});